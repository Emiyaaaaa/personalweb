from .models import Diary,DiaryImg,DiaryComment
from django.shortcuts import render
from django.http import JsonResponse

class DiaryView():
    def get_main_page(self,request,text_max_length=37):
        diary_info = []
        loadStatus = '加载中...'
        showBeian = 0
        stick_diary = Diary.objects.filter(is_stick=1)
        diary = Diary.objects.order_by('-text_id').exclude(is_display=0)[0:10]
        # diary = stick_diary|all_diary

        if len(diary)==0:
            return JsonResponse({'status':'ended'})
        elif len(diary) < 10:
            loadStatus = '已加载全部'
            showBeian = 1

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
                'comment_num': len(diaryComment)
            })
        return render(request, 'matter1.html', {'diary_info': diary_info, 'loadStatus':loadStatus,'showBeian':showBeian})

    def getBriefText(self,text,text_max_length,line=2):
        text_length = 0
        text_index = 0
        cn_char = ['，','。','“','”','；','：','【','】','、','！','·','￥','（','）','’','《','》']
        text_max_length = int(text_max_length)
        for uchar in text:
            if (uchar >= u'\u4e00' and uchar <= u'\u9fa5') or (uchar in cn_char):
                text_length = text_length + 1 # 中文长度加一
            else:
                text_length = text_length + 0.5 # 英文长度加0.5
            text_index = text_index + 1

            if text_length >= text_max_length * line - 6:
                return {'is_brief': 'true', 'brief_text': text[:text_index-1]}

        return {'is_brief': 'false','brief_text': text}

    def get_content(self,request,text_id):
        diary = Diary.objects.filter(text_id=text_id)
        diaryImg = DiaryImg.objects.filter(diary=text_id)
        diaryComment = DiaryComment.objects.exclude(is_display=0).filter(comment = text_id)
        content_info = [{'content':'加载失败'}]
        for diary in diary:
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
            break

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