# from api.beat_detector import slicer
import os
from flask import Flask, Response, request, send_file, flash, redirect, url_for
# from flask_uploads import UploadSet, configure_uploads, DATA
from werkzeug.utils import secure_filename

UPLOAD_FOLDER = '/home/richardsonalex101/luupr/public/'
ALLOWED_EXTENSIONS = {'wav', 'mp3', 'aiff'}

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# app = Flask(__name__)
# @app.route("/slicer/")
# def slicering():
#     access_id = request.args['access_id']
#     form = request.args['format']
#     method = request.args['method']
#     song = request.args['body']
# #     return Response(generate)

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/Upload', methods=['GET', 'POST'])
def upload_file():
    
    if request.method == 'POST':
        # check if the post request has the file part
        if 'file' not in request.files:
            print('No file part')
            # return redirect(request.url)
        file = request.files['file']
        # # if user does not select file, browser also
        # # submit an empty part without filename
        if file.filename == '':
            print('No selected file')
            # return redirect(request.url)
        if file and allowed_file(file.filename):
            # filename = secure_filename(file.filename)
            filename = file.filename
            file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
            return redirect(url_for('upload_file',
                                    filename=filename))
        # return send_file(
        #     os.path.join(app.config['UPLOAD_FOLDER'], filename), 
        #     mimetype="audio/wav", 
        #     as_attachment=True, 
        #     attachment_filename="infinite.wav")
    # return '''
    # <!doctype html>
    # <title>Upload new File</title>
    # <h1>Upload new File</h1>
    # <form method=post enctype=multipart/form-data>
    #   <input type=file name=file>
    #   <input type=submit value=Upload>
    # </form>
    # '''

@app.route('/path')
def view_method():

    #  print(request.args['name'])

    #  path_to_file = UPLOAD_FOLDER + request.args['name']
     path_to_file = "./../../public/song.mp3"

     return send_file(
         path_to_file, 
         mimetype="audio/mpeg", 
         as_attachment=False, 
        #  attachment_filename="song.mp3"
        )

@app.route('/song')
def easy():
    return 
@app.route("/wav")
def streamwav():
    def generate():
        with open("../../public/infinite.wav", "rb") as fwav:
            data = fwav.read(1024)
            while data:
                yield data
                data = fwav.read(1024)
    return Response(generate(), mimetype="audio/x-wav")


@app.route("/ogg")
def streamogg():
    def generate():
        with open("signals/song.ogg", "rb") as fogg:
            data = fogg.read(1024)
            while data:
                yield data
                data = fogg.read(1024)
    return Response(generate(), mimetype="audio/ogg")

# photos = UploadSet('photos', IMAGES)

if __name__ == "__main__":
    # app.secret_key = 'super secret key'
    # app.config['SESSION_TYPE'] = 'filesystem'
    app.run(debug=True)