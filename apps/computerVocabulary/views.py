from django.shortcuts import render
from django.views.generic import View
from .models import ComputerVocabulary
from django.http import HttpResponse

class ComputerVocabularyView(View):
    def post(self,request):
        allVocabulary = ComputerVocabulary.objects.all()
        vocabularyInfo = []
        for voc in allVocabulary:
            vocabularyInfo.append({
                'english':voc.english,
                'chinese':voc.chinese,
                'remark':voc.remark
            })
        if request.POST.get('submit') == '1':
            try:
                english = request.POST.get('english')
                chinese = request.POST.get('chinese')
                remark = request.POST.get('remark')


                thisVocabulary = ComputerVocabulary.objects.filter(english=english)
                if(len(thisVocabulary) == 0):
                    ComputerVocabulary.objects.create(english=english, chinese=chinese, remark=remark)
            except Exception as e:
                print(e)
                pass
            return render(request, 'computerVocabulary.html', {'vocabularyInfo':vocabularyInfo})
        else:
            return render(request, 'computerVocabulary.html', {'vocabularyInfo':vocabularyInfo})

    def get(self,request):
        return self.post(request)
