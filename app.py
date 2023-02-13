from flask import Flask, render_template, request, redirect
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime


ALLOWED_HOSTS = ['.vercel.app', '.now.sh']

app = Flask(__name__)

# app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///test.db"
app.config["SQLALCHEMY_DATABASE_URI"] = "postgres://dvzejjlm:ENSDIAKVKiG70lcYftGsKUyyVfEnYKTC@tiny.db.elephantsql.com/dvzejjlm"
db = SQLAlchemy(app)


class Essay(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(200), nullable=False, unique=True)
    essay = db.Column(db.String, nullable=False)
    switchTabs = db.Column(db.Integer)
    copyPaste = db.Column(db.Integer)
    date = db.Column(db.DateTime, default=datetime.utcnow)

    def __repr__(self) -> str:
        return f'{self.id} - {self.text}'


@app.route('/', methods=['POST', 'GET'])
def index():
    if request.method == 'POST':
        email = request.form['email']
        essay = request.form['essay']
        switchTabs = request.form['switchTab']
        copyPaste = request.form['copyPaste']
        new_essay = Essay(email=email, essay=essay,
                          switchTabs=switchTabs, copyPaste=copyPaste)

        try:
            db.session.add(new_essay)
            db.session.commit()
            return redirect("/submitted")
        except:
            return "there was some problem adding the content."

    else:
        essays = Essay.query.order_by(Essay.date).all()
        return render_template('index.html', essays=essays)


@app.route('/submitted')
def submitted():
    return render_template('submitted.html')


if __name__ == '__main__':
    app.run(debug=True)
