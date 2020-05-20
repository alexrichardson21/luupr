import os
import requests
import json
import time

def sonic_api(filename, endpoint, sonic_params={'format': 'json'}):
    _, extension = os.path.splitext(filename)

    def set_params():
        s_params = {
            'access_id': '537285d1-d69e-4b5e-90bb-1d94a3058a84',
            'format': 'json'
        }  # .update(sonic_params)
        return s_params

    def set_files():
        return {
            'input_file': ('song%s' % extension, open(filename, 'rb'), "multipart/form-data")
        }

    # response = requests.post(
    #     'https://api.sonicAPI.com/%s' % endpoint, files=set_files(), params=set_params())
    # print(response.url)

    # Increment auth codes if necessary
    # while response.status_code in [400, 401, 403]:
    #     print('\tStatus Code: %d' % response.status_code)
    #     time.sleep(2)

    #     self.sonic_auth_index += 1
    #     if self.sonic_auth_index >= len(self.auth_codes):
    #         raise Exception("No more usable access id's")

    #     print('\tChanged Authorization: %d/%d' %
    #             (self.sonic_auth_index+1, len(self.auth_codes)))
    #     print('\tTrying Again ...')
    print('sending ...')
    response = requests.post(
        'https://api.sonicAPI.com/%s' % endpoint, files=set_files(), data=set_params())
    print('received')
    # return content or raise exception
    if response.status_code == 200:
        return response.content
    else:
        print('\tStatus Code: %d' % response.status_code)
        raise Exception("Bad request bro")

def tempo_analysis(filename):

    content = json.loads(sonic_api(
        filename, 'analyze/tempo'))['auftakt_result']
    beats = content['click_marks']
    beats_per_bar = content['clicks_per_bar']
    bpm = round(content['overall_tempo'])

    print(bpm)
    print(beats_per_bar)
    print(beats)

    return beats

if __name__ == "__main__":
    x = tempo_analysis('./public/infinite.wav')
    # return x

# 