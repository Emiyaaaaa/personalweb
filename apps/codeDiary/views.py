from .models import CodeDiary,CodeDiaryImg,CodeComment
from django.shortcuts import render
import re

class CodeDiaryView():
    def get(self,request,text_max_length=37):
        codeDiary_info = []
        stick_diary = CodeDiary.objects.filter(is_stick=1)
        all_diary = CodeDiary.objects.all().order_by('-text_id')
        codeDiary = stick_diary|all_diary

        i = 0
        for codeDiary in codeDiary:
            if codeDiary.is_display == 1:
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
                # i = i + 1
                # if i >= 20:
                #     break
        return render(request,'matter0.html',{'codeDiary_info':codeDiary_info})

    def getBriefText(self,text,text_max_length,line=2):
        text_max_length = int(text_max_length)
        if len(text) > text_max_length * line - 5:
            return {'is_brief': 'true', 'brief_text': text[:text_max_length * line - 5]}
        else:
            return {'is_brief': 'false','brief_text': text}

    def get_content(self,request,text_id):
        codeDiary = CodeDiary.objects.filter(text_id=text_id)
        codeDiaryImg = CodeDiaryImg.objects.filter(codeDiary=text_id)
        codeComment = CodeComment.objects.filter(comment = text_id)
        content_info = [{'content':'加载失败'}]
        for codeDiary in codeDiary:
            content_info = {
                'date':codeDiary.date,
                'content':codeDiary.content
            }
            codeDiary.visit_num = codeDiary.visit_num + 1
            codeDiary.save()
            img = []
            for codeDiaryImg in codeDiaryImg:
                img.append(codeDiaryImg.img)
            content_info['img'] = img

            comment = []
            not_nick_name = ['作者', 'emiya', 'Emiya']
            i = 0
            for codeComment in codeComment:
                nick_name = codeComment.nick_name
                if nick_name.strip() == '' or nick_name == None or nick_name in not_nick_name:
                    nick_name = '路人'+ str(i)
                    i = i+1
                comment.append({
                    'nickname':nick_name,
                    'content':codeComment.content,
                    'comment_to':codeComment.comment_to
                })
            content_info['comment'] = comment
            break

        return render(request,'matter0Content.html',{'codeDiary':content_info})