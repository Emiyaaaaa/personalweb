from .models import CodeDiary,CodeDiaryImg,CodeComment
from django.shortcuts import render
import re
from django.http import JsonResponse


class CodeDiaryView():
    def get(self,request,text_max_length=37):
        codeDiary_info = []
        loadStatus='加载中...'
        stick_diary = CodeDiary.objects.filter(is_stick=1)
        codeDiary = CodeDiary.objects.order_by('-text_id').exclude(is_display=0)[0:10]
        # codeDiary = stick_diary|all_diary
        if len(codeDiary) == 0:
            return JsonResponse({'status': 'ended'})
        elif len(codeDiary) < 10:
            loadStatus = '已加载全部'

        for codeDiary in codeDiary:
            text_id = codeDiary.text_id
            markdown_text = codeDiary.content
            unmarkdown_text = re.sub('[#`-]', '', markdown_text).replace(' ', '').replace('\n','')
            line = 2
            if codeDiary.title != None:line = 1
            brief_text = self.getBriefText(unmarkdown_text, text_max_length,line)
            codeDiaryImg = CodeDiaryImg.objects.filter(codeDiary=text_id)
            codeDiary_info.append({
                'date':codeDiary.date,
                'content':brief_text['brief_text'],
                'text_id':text_id,
                'title':codeDiary.title,
                'is_brief':brief_text['is_brief'],
                'img_num':len(codeDiaryImg)
            })
        return render(request,'matter0.html',{'codeDiary_info':codeDiary_info,'loadStatus':loadStatus})

    def get_content(self,request,text_id):
        codeDiary = CodeDiary.objects.filter(text_id=text_id)
        codeDiaryImg = CodeDiaryImg.objects.filter(codeDiary=text_id)
        codeComment = CodeComment.objects.filter(comment = text_id)
        content_info = [{'content':'加载失败'}]
        for codeDiary in codeDiary:
            content_info = {
                'date':codeDiary.date,
                'dateTime':codeDiary.dateTime,
                'content':codeDiary.content
            }
            codeDiary.visit_num = codeDiary.visit_num + 1
            codeDiary.save()
            img = []
            for codeDiaryImg in codeDiaryImg:
                img.append(codeDiaryImg.img)
            content_info['img'] = img

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
            break

        return render(request,'matter0Content.html',{'codeDiary':content_info})

    def getMoreContent(self,request,finally_id,text_max_length=37):
        codeDiary_info = []
        loadStatus = '加载中...'
        moreCodeDiary = CodeDiary.objects.order_by('-text_id').filter(text_id__lt=finally_id).exclude(is_display=0)[0:10]
        if len(moreCodeDiary) == 0:
            return JsonResponse({'status': 'ended'})
        elif len(moreCodeDiary) < 10:
            loadStatus = '已加载全部'
        for codeDiary in moreCodeDiary:
            text_id = codeDiary.text_id
            markdown_text = codeDiary.content
            unmarkdown_text = re.sub('[#`-]', '', markdown_text).replace(' ', '').replace('\n', '')
            line = 2
            if codeDiary.title != None: line = 1
            brief_text = self.getBriefText(unmarkdown_text, text_max_length, line)
            codeDiaryImg = CodeDiaryImg.objects.filter(codeDiary=text_id)
            codeDiary_info.append({
                'date': codeDiary.date,
                'content': brief_text['brief_text'],
                'text_id': text_id,
                'title': codeDiary.title,
                'is_brief': brief_text['is_brief'],
                'img_num': len(codeDiaryImg),
            })
        return render(request, 'matter0.html', {'codeDiary_info': codeDiary_info,'loadStatus':loadStatus})


    def getBriefText(self,text,text_max_length,line=2):
        text_max_length = int(text_max_length)
        if len(text) > text_max_length * line - 5:
            return {'is_brief': 'true', 'brief_text': text[:text_max_length * line - 5]}
        else:
            return {'is_brief': 'false','brief_text': text}