from .models import PersonalCenter,Avatar,WebsiteIcon,Signature

class PersonalCenterView():
    def get_simple_personal_info(self):
        signature = ''
        name = 'undefined'
        avatar = 'avatar/123.jpg'
        website_icon = 'websiteIcon/123.jpg'

        personal_info = PersonalCenter.objects.filter(id=1)
        avatar_info = Avatar.objects.filter(id=1)
        website_icon_info = WebsiteIcon.objects.filter(id=1)
        signature_info = Signature.objects.all().order_by('-id')

        for personal_info in personal_info:
            name = personal_info.name
            break

        for avatar_info in avatar_info:
            avatar = avatar_info.avatar
            break

        for website_icon_info in website_icon_info:
            website_icon = website_icon_info.website_icon
            break

        for signature_info in signature_info:
            signature = signature_info.signature
            break

        personal_info_dict = {
            'signature':signature,
            'name': name,
            'avatar': str(avatar),
            'website_icon':str(website_icon)
        }
        return personal_info_dict