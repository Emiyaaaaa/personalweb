from .models import CodeDiary,CodeDiaryImg,CodeComment
from django.shortcuts import render
import re
from django.http import JsonResponse
from itertools import chain


class CodeDiaryView():
    def get(self,request,text_max_length=37):
        codeDiary_info = []
        loadStatus='加载中...'
        showBeian = 0
        stickCodeDiary = CodeDiary.objects.filter(is_stick=1).exclude(is_display=0)
        unstickCodeDiary = CodeDiary.objects.filter(is_stick=0).order_by('-text_id').exclude(is_display=0)[0:10]

        if len(unstickCodeDiary) == 0:
            return JsonResponse({'status': 'ended'})
        elif len(unstickCodeDiary) < 10:
            loadStatus = '已加载全部'
            showBeian = 1

        # 合并
        codeDiary = []
        for sc in stickCodeDiary:
            codeDiary.append(sc)
        for usc in unstickCodeDiary:
            codeDiary.append(usc)

        for codeDiary in codeDiary:
            text_id = codeDiary.text_id
            mardown_text = codeDiary.content
            unmarkdown_text = re.sub('[#`-]|\n|\s', '', mardown_text)# 简单还原markdown,方便裁剪制作brief_text
            markdownLinkObj = re.search(r'\[(.*)\]\(http.*?\)', unmarkdown_text, re.I)
            try:
                unmarkdown_text = re.sub(r'\[.*\]\(http.*?\)',markdownLinkObj.group(1),unmarkdown_text)
            except:
                pass
            line = 2
            if codeDiary.title != None:line = 1
            brief_text = self.getBriefText(unmarkdown_text, text_max_length,line)
            # 将<和>转义后再传入模板
            # brief_text['brief_text'] = re.sub('\n', '$n$', brief_text['brief_text'])
            # re.sub('>', '\>', brief_text['brief_text'])
            codeDiaryImg = CodeDiaryImg.objects.filter(codeDiary=text_id)
            codeDiaryComment = CodeComment.objects.filter(comment=text_id).exclude(is_display=0)
            if codeDiary.tag != None:
                codeDiaryTag = codeDiary.tag.split(';')
            else:
                codeDiaryTag = []
            codeDiary_info.append({
                'date':codeDiary.date,
                'content':brief_text['brief_text'],
                'text_id':text_id,
                'title':codeDiary.title,
                'is_brief':brief_text['is_brief'],
                'tag':codeDiaryTag,
                'img_num':len(codeDiaryImg),
                'comment_num':len(codeDiaryComment),
                'is_stick':codeDiary.is_stick
            })
        return render(request,'matter0.html',{'codeDiary_info':codeDiary_info,'loadStatus':loadStatus,'showBeian':showBeian})

    def get_content(self,request,text_id):
        codeDiary = CodeDiary.objects.get(text_id=text_id)
        codeDiaryImg = CodeDiaryImg.objects.filter(codeDiary=text_id)
        codeComment = CodeComment.objects.exclude(is_display=0).filter(comment = text_id)
        content = codeDiary.content
        content = re.sub('\n', '$n$', content)
        content = re.sub('\t', '$t$', content)
        content = re.sub(' ', '$s$', content)
        content_info = {
            'date':codeDiary.date,
            'dateTime':codeDiary.dateTime,
            'title':codeDiary.title,
            'content':content
        }
        codeDiary.visit_num = codeDiary.visit_num + 1
        codeDiary.save()
        img = []
        for codeDiaryImg in codeDiaryImg:
            img.append(codeDiaryImg.img)
        content_info['img'] = img
        content_info['imgLenth'] = len(img)

        # 评论
        comment = []
        i = 1
        for codeComment in codeComment:
            nick_name = codeComment.nick_name
            if nick_name == None:
                nick_name = '路人'+ str(i)
                i = i + 1
            elif nick_name.strip() == '':
                nick_name = '路人'+ str(i)
                i = i + 1
            comment.append({
                'nickname':nick_name,
                'content':codeComment.content,
                'comment_to':codeComment.comment_to
            })
        content_info['comment'] = comment
        return render(request,'matter0Content.html',{'codeDiary':content_info})

    def getMoreContent(self,request,finally_id,text_max_length=37):
        codeDiary_info = []
        loadStatus = '加载中...'
        showBeian = 0
        moreCodeDiary = CodeDiary.objects.order_by('-text_id').filter(text_id__lt=finally_id).exclude(is_display=0)[0:10]
        if len(moreCodeDiary) == 0:
            return JsonResponse({'status': 'ended'})
        elif len(moreCodeDiary) < 10:
            loadStatus = '已加载全部'
            showBeian = 1
        for codeDiary in moreCodeDiary:
            text_id = codeDiary.text_id
            markdown_text = codeDiary.content
            unmarkdown_text = re.sub('[#`-]|\n|\s', '', markdown_text)# 简单还原markdown,方便裁剪制作brief_text
            line = 2
            if codeDiary.title != None: line = 1
            brief_text = self.getBriefText(unmarkdown_text, text_max_length, line)
            codeDiaryImg = CodeDiaryImg.objects.filter(codeDiary=text_id)
            codeDiaryComment = CodeComment.objects.filter(comment=text_id).exclude(is_display=0)
            if codeDiary.tag != None:
                codeDiaryTag = codeDiary.tag.split(';')
            else:
                codeDiaryTag = []
            codeDiary_info.append({
                'date': codeDiary.date,
                'content': brief_text['brief_text'],
                'text_id': text_id,
                'title': codeDiary.title,
                'is_brief': brief_text['is_brief'],
                'tag':codeDiaryTag,
                'img_num': len(codeDiaryImg),
                'comment_num':len(codeDiaryComment)
            })
        return render(request, 'matter0.html', {'codeDiary_info': codeDiary_info,'loadStatus':loadStatus,'showBeian':showBeian})


    def getBriefText(self,text,text_max_length,line=2):
        text_length = 0
        text_index = 0
        text_max_length = int(text_max_length)
        for uchar in text:
            # 全角字符加一，半角字符加0.5
            # if判断条件依次为：汉字全角，符号全角
            if (uchar >= u'\u4e00' and uchar <= u'\u9fa5') or (uchar >= u'\uff01' and uchar <= u'\uff5e'):
                text_length = text_length + 1  # 全角字符加一
            else:
                text_length = text_length + 0.5  # 半角字符加0.5
            text_index = text_index + 1

            if text_length >= text_max_length * line - 6:
                return {'is_brief': 'true', 'brief_text': text[:text_index-1]}
        else:
            return {'is_brief': 'false','brief_text': text}