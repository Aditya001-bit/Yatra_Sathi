from flask import Flask, render_template # type: ignore

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/dashboard")
def dashboard():
    return render_template("dashboard.html")

@app.route("/contact")
def contact():
    return render_template("contact.html")



@app.route("/budget")
def budget():
    return render_template("budget.html")

@app.route("/location")
def location():
    return render_template("location.html")

@app.route("/weather")
def weather():
    return render_template("weather.html")

@app.route("/reviews")
def reviews():
    return render_template("reviews.html")

    
if __name__ == "__main__":
    # Run locally
    app.run(debug=True, host="127.0.0.1", port=5000)

@app.route("/budget")
def budget():
    return render_template("budget.html")

@app.route("/live-location")
def live_location():
    return render_template("live-location.html")

@app.route("/weather")
def weather():
    return render_template("weather.html")

@app.route("/photo-review")
def photo_review():
    return render_template("photo-review.html")

