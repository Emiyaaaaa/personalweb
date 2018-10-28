from .models import PersonalCenter,Avatar,WebsiteIcon

class PersonalCenterView():
    def get_simple_personal_info(self):
        name = 'undefined'
        avatar = 'avatar/123.jpg'
        website_icon = 'websiteIcon/123.jpg'

        personal_info = PersonalCenter.objects.filter(id=1)
        avatar_info = Avatar.objects.filter(id=1)
        website_icon_info = WebsiteIcon.objects.filter(id=1)

        for personal_info in personal_info:
            name = personal_info.name
            break

        for avatar_info in avatar_info:
            avatar = avatar_info.avatar
            break

        for website_icon_info in website_icon_info:
            website_icon = website_icon_info.website_icon
            break

        personal_info_dict = {
            'name': name,
            'avatar': str(avatar),
            'website_icon':str(website_icon)
        }
        return personal_info_dict