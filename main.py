from flask import Flask, render_template, request, url_for, redirect, flash
from flight_search import FlightSearch
from formatter import FlightData
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)
app.config['SECRET_KEY'] = 'do384j#kd%0964az!'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

flight_search = FlightSearch()
formatter = FlightData()


class User(db.Model):
    email = db.Column(db.String(100), unique=True, primary_key=True)
    password = db.Column(db.String(100), nullable=False)
    name = db.Column(db.String(100), nullable=False)


is_logged_in = False
name = ''


@app.route("/", methods=["GET", "POST"])
def home():
    return render_template("home_page.html", is_logged_in=is_logged_in, name=name)


@app.route("/results", methods=["GET", "POST"])
def results_page():
    input_info = {
        "from_d": flight_search.get_code(request.form["from"]),
        "to_d": flight_search.get_code(request.form["to"]),
        "earliest_date": request.form["earliest_date"],
        "latest_date": request.form["latest_date"],
        "min_nights": request.form["min_nights"],
        "max_nights": request.form["max_nights"],
        "type_of_trip": request.form["drop-down-menu"],
        "num_people": request.form["num_people"],
        "adults": request.form["adults"],
        "children": request.form["children"],
        "infants": request.form["infants"],
        "num_baggage": request.form["num_baggage"],
        "hold_bag": request.form["hold_bag"],
        "hand_bag": request.form["hand_bag"],

    }
    results_data = flight_search.search(input_info)
    results = formatter.data_formatter(results_data["data"])
    global is_logged_in
    global name
    return render_template("results.html", info=input_info, search_result=results, is_logged_in=is_logged_in, name=name)


@app.route("/login", methods=["GET", "POST"])
def login():
    if request.method == "POST":
        email = request.form.get('email')
        password = request.form.get('password')

        user = User.query.filter_by(email=email).first()
        # Email doesn't exist or password incorrect.
        if not user:
            flash("That email does not exist, please try again.")
            return redirect(url_for('login'))
        elif not check_password_hash(user.password, password):
            flash('Password incorrect, please try again.')
            return redirect(url_for('login'))
        else:
            global is_logged_in
            is_logged_in = True
            global name
            name = user.name
            return render_template("home_page.html", is_logged_in=is_logged_in, name=name)
    return render_template("login.html")


@app.route("/register", methods=["GET", "POST"])
def register():
    if request.method == "POST":

        if User.query.filter_by(email=request.form.get('email')).first():
            # User already exists
            flash("You've already signed up with that email, log in instead!")
            return redirect(url_for('login'))

        hash_and_salted_password = generate_password_hash(
            request.form['password'],
            method='pbkdf2:sha256',
            salt_length=8
        )
        new_user = User(
            email=request.form['email'],
            name=request.form['name'],
            password=hash_and_salted_password,
        )
        db.session.add(new_user)
        db.session.commit()
        global is_logged_in
        is_logged_in = True
        global name
        name = new_user.name
        return render_template("home_page.html", is_logged_in=True, name=new_user.name)
    return render_template("register.html")


@app.route("/logout", methods=["GET", "POST"])
def logout():
    global is_logged_in
    is_logged_in = False
    global name
    name = ""
    return render_template("home_page.html", is_logged_in=False)


if __name__ == "__main__":
    app.run(debug=True)
