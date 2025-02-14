import gdown
import os
import tensorflow as tf
from flask import Flask, request, render_template, session
from tensorflow.keras.preprocessing import image
import numpy as np

# 🔹 Google Drive File ID
file_id = "1_OA1NHqirp4C242UeZxrw3Wvnba7Bk6t" 

# 🔹 Google Drive Direct Download Link
download_url = f"https://drive.google.com/uc?id={1_OA1NHqirp4C242UeZxrw3Wvnba7Bk6t}"

app = Flask(__name__)
app.secret_key = "supersecretkey"  # Required for session management

model_path = "model.h5""
if not os.path.exists(model_path):
    print("Downloading model from Google Drive...")
    # print(f"❌ Model file missing: {model_path}")
    gdown.download(download_url, model_path, quiet=False)
else:
    print("✅ Model found! Loading...")
    model = tf.keras.models.load_model(model_path)
    print("✅ Model Loaded Successfully!")


# Class Labels
class_labels = ['BA-cellulitis', 'BA-impetigo', 'FU-athlete-foot', 'FU-nail-fungus', 'FU-ringworm',
                'PA-cutaneous-larva-migrans', 'VI-chickenpox', 'VI-shingles']

# This is duplicate function creating for testing purpose
@app.route("/", methods=["GET", "POST"])
def home():
    if request.method == "POST":
        img_file = request.files.get("image")
        if img_file:
            img_path = "static/uploads/" + img_file.filename
            img_file.save(img_path)

            img = image.load_img(img_path, target_size=(224, 224))
            img_array = image.img_to_array(img) / 255.0
            img_array = np.expand_dims(img_array, axis=0)

            preds = model.predict(img_array)
            session['prediction'] = class_labels[np.argmax(preds)]  # Store prediction in session
        else:
            session.pop('prediction', None)  # Remove prediction if no image uploaded

    return render_template("index.html", prediction=session.get('prediction', None))



if __name__ == "__main__":
    app.run(debug=True, port=5000)

