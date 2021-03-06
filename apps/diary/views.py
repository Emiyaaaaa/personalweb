from .models import Diary,DiaryImg,DiaryComment
from django.shortcuts import render
from django.http import JsonResponse

class DiaryView():
    def get_main_page(self,request,text_max_length=37):
        diary_info = []
        loadStatus = '加载中...'
        showBeian = 0
        stickDiary = Diary.objects.filter(is_stick=1).exclude(is_display=0)
        unstickDiary = Diary.objects.filter(is_stick=0).order_by('-text_id').exclude(is_display=0)[0:10]

        if len(unstickDiary)==0:
            return JsonResponse({'status':'ended'})
        elif len(unstickDiary) < 10:
            loadStatus = '已加载全部'
            showBeian = 1

        # 合并
        diary = []
        for sc in stickDiary:
            diary.append(sc)
        for usc in unstickDiary:
            diary.append(usc)

        for diary in diary:
            text_id = diary.text_id
            line = 2
            if diary.title != None: line = 1
            text = diary.content
            text = text.replace('<a>http://','').replace('<a>https://','').replace('/</a>','').replace('</a>','')
            brief_text = self.getBriefText(text, text_max_length, line)
            diaryImg = DiaryImg.objects.filter(diary = text_id)
            diaryComment = DiaryComment.objects.filter(comment = text_id).exclude(is_display=0)
            if diary.tag != None:
                diaryTag = diary.tag.split(';')
            else:
                diaryTag = []
            diary_info.append({
                'content':brief_text['brief_text'],
                'date_weather':diary.date+ ' ' +diary.weather,
                'text_id':text_id,
                'title':diary.title,
                'is_brief':brief_text['is_brief'],
                'tag':diaryTag,
                'img_num': len(diaryImg),
                'comment_num': len(diaryComment),
                'is_stick': diary.is_stick
            })
        return render(request, 'matter1.html', {'diary_info': diary_info, 'loadStatus':loadStatus,'showBeian':showBeian})

    def get_content(self,request,text_id):
        diary = Diary.objects.get(text_id=text_id)
        diaryImg = DiaryImg.objects.filter(diary=text_id)
        diaryComment = DiaryComment.objects.exclude(is_display=0).filter(comment = text_id)
        content_info = [{'content':'加载失败'}]
        content_info = {
            'date':diary.date+ ' ' +diary.weather,
            'dateTime':diary.dateTime,
            'title':diary.title,
            'content':diary.content
        }
        diary.visit_num = diary.visit_num + 1
        diary.save()
        img = []
        for diaryImg in diaryImg:
            img.append(diaryImg.img)
        content_info['img'] = img
        content_info['imgLenth'] = len(img)
        
        comment = []
        i = 0
        for diaryComment in diaryComment:
            nick_name = diaryComment.nick_name
            if nick_name == None:
                nick_name = '路人'+ str(i)
                i = i + 1
            elif nick_name.strip() == '':
                nick_name = '路人'+ str(i)
                i = i + 1
            comment.append({
                'nickname':nick_name,
                'content':diaryComment.content,
                'comment_to':diaryComment.comment_to
            })
        content_info['comment'] = comment

        return render(request,'matter1Content.html',{'diary':content_info})

    def getMoreContent(self,request,finally_id,text_max_length=37):
        diary_info = []
        loadStatus = '加载中...'
        showBeian = 0
        moreDiary = Diary.objects.order_by('-text_id').filter(text_id__lt = finally_id).exclude(is_display=0)[0:10]
        if len(moreDiary)==0:
            return JsonResponse({'status':'ended'})
        elif len(moreDiary) < 10:
            loadStatus = '已加载全部'
            showBeian = 1

        for diary in moreDiary:
            text_id = diary.text_id
            line = 2
            if diary.title != None: line = 1
            text = diary.content
            text = text.replace('<a>http://','').replace('<a>https://','').replace('/</a>','').replace('</a>','')
            brief_text = self.getBriefText(text, text_max_length, line)
            diaryImg = DiaryImg.objects.filter(diary=text_id)
            diaryComment = DiaryComment.objects.filter(comment = text_id).exclude(is_display=0)
            if diary.tag != None:
                diaryTag = diary.tag.split(';')
            else:
                diaryTag = []
            diary_info.append({
                'content': brief_text['brief_text'],
                'date_weather': diary.date + ' ' + diary.weather,
                'text_id': text_id,
                'title': diary.title,
                'is_brief': brief_text['is_brief'],
                'tag':diaryTag,
                'img_num': len(diaryImg),
                'comment_num': len(diaryComment)
            })
        return render(request, 'matter1.html', {'diary_info': diary_info,'loadStatus':loadStatus,'showBeian':showBeian})

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