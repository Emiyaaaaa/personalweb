from .models import Diary,DiaryImg,DiaryComment
from django.shortcuts import render

class DiaryView():
    def get_main_page(self,request,text_max_length=37):
        diary_info = []
        stick_diary = Diary.objects.filter(is_stick=1)
        all_diary = Diary.objects.all().order_by('-text_id')
        diary = stick_diary|all_diary
        i = 0
        for diary in diary:
            if diary.is_display == 1:
                text_id = diary.text_id
                brief_text = self.getBriefText(diary.content, text_max_length)
                diaryImg = DiaryImg.objects.filter(diary=text_id)
                diary_info.append({
                    'content':brief_text['brief_text'],
                    'date_weather':diary.date+ ' ' +diary.weather,
                    'text_id':text_id,
                    'is_brief':brief_text['is_brief'],
                    'img_num': len(diaryImg)
                })
                # i = i + 1
                # if i >= 20:
                #     break
        return render(request, 'matter1.html', {'diary_info': diary_info})

    def getBriefText(self,text,text_max_length):
        text_max_length = int(text_max_length)
        if len(text) > text_max_length * 2 - 5:
            return {'is_brief': 'true', 'brief_text': text[:text_max_length * 2 - 5]}
        else:
            return {'is_brief': 'false','brief_text': text}

    def get_content(self,request,text_id):
        diary = Diary.objects.filter(text_id=text_id)
        diaryImg = DiaryImg.objects.filter(diary=text_id)
        diaryComment = DiaryComment.objects.filter(comment = text_id)
        content_info = [{'content':'加载失败'}]
        for diary in diary:
            content_info = {
                'date':diary.date+ ' ' +diary.weather,
                'content':diary.content
            }
            diary.visit_num = diary.visit_num + 1
            diary.save()
            img = []
            for diaryImg in diaryImg:
                img.append(diaryImg.img)
            content_info['img'] = img

            comment = []
            not_nick_name = ['作者', 'emiya', 'Emiya']
            i = 0
            for diaryComment in diaryComment:
                nick_name = diaryComment.nick_name
                if nick_name.strip() == '' or nick_name == None or nick_name in not_nick_name:
                    nick_name = '路人'+ str(i)
                    i = i+1
                comment.append({
                    'nickname':nick_name,
                    'content':diaryComment.content,
                    'comment_to':diaryComment.comment_to
                })
            content_info['comment'] = comment
            break

        return render(request,'matter1Content.html',{'diary':content_info})