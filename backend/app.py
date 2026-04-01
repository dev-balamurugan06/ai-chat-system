from flask import Flask
from flask_cors import CORS

from db import close_db
from auth import auth
from chatbot import get_response

app = Flask(__name__)
CORS(app)

# 🔥 THIS IS THE CORRECT DB FIX
app.teardown_appcontext(close_db)

# register auth blueprint
app.register_blueprint(auth, url_prefix="/auth")


@app.route("/chat", methods=["POST"])
def chat():
    from flask import request, jsonify
    user_msg = request.json["message"]
    bot_reply = get_response(user_msg)
    return jsonify({"reply": bot_reply})


if __name__ == "__main__":
    app.run(debug=True)
