from pydrive2.drive import GoogleDrive
from pydrive2.auth import GoogleAuth, ServiceAccountCredentials

gauth = GoogleAuth()
# we don't need to go hog-wild with permissions, see
# https://developers.google.com/drive/api/v3/about-auth
scope = ['https://www.googleapis.com/auth/drive.file']
gauth.credentials = ServiceAccountCredentials.from_json_keyfile_name('google-credentials.json', scope)
drive = GoogleDrive(gauth)
file4 = drive.CreateFile({'title': 'appdata3.json',
                          'mimeType': 'application/json',
                          # to get parent ID (i.e. the folder), click on folder on drive.google.com
                          # and copy the last bit after https://drive.google.com/drive/u/1/folders/**folder ID**
                          # this ID doesn't need to be secret.
                          'parents': [{'id': '1tl0X6_v51QK979hr7KFFdS94KkGNOxmD'}]
                          })
file4.SetContentString('{"firstname": "John", "lastname": "Smith"}')
file4.Upload()

for file_list in drive.ListFile({'maxResults': 10}):
    print('Received {} files from Files.list()'.format(len(file_list))) # <= 10
    for file1 in file_list:
        print('title: {}, id: {}, mime: {}'.format(file1['title'], file1['id'], file1['mimeType']))
