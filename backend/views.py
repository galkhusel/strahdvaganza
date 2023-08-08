from flask import Blueprint, render_template, request, jsonify, redirect, url_for

views = Blueprint(__name__, "views")

@views.route("/")
def home():
	return render_template("index.html", name="marian", age="23")

#parameters
@views.route("/profile/<username>")
def profile(username):
	return render_template("index.html", name=username, age="23")
 
#query parameters
@views.route("/query")
def query():
	args = request.args
	name = args.get("name")
	return render_template("index.html", name=name, age="23")

#show json
@views.route('/json')
def get_json():
	return jsonify({"name":"tim", "coolnes": 10})

#get json
@views.route("/data")
def get_data():
	data = request.json
	return jsonify(data)

#redirect
@views.route("/go-to-home")
def go_to_home():
	return redirect(url_for("views.home"))

