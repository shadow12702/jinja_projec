from flask import Flask, render_template, redirect, url_for, session, request, flash
from functools import wraps
import os

app = Flask(__name__)
app.secret_key = os.environ.get('SECRET_KEY', 'default-dev-key-change-in-production')

# Login required decorator
def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if 'logged_in' not in session:
            return redirect(url_for('login', next=request.url))
        return f(*args, **kwargs)
    return decorated_function

# Routes
@app.route('/')
def index():
    return redirect(url_for('dashboard'))

# Authentication routes
@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form.get('username')
        password = request.form.get('password')
        
        # Simple authentication for demo (replace with database check)
        if username == 'admin' and password == 'admin':
            session['logged_in'] = True
            session['username'] = username
            return redirect(url_for('dashboard'))
        else:
            flash('Invalid credentials. Please try again.', 'error')
    
    return render_template("login.html")

@app.route('/logout')
def logout():
    session.clear()
    return redirect(url_for('login'))

# Protected routes
@app.route('/dashboard')
@login_required
def dashboard():
    return render_template(
        "dashboard.html",
        title="Dashboard",
        active_page="dashboard"
    )

@app.route('/user/')
@login_required
def show_user():
    return render_template(
        "user.html", 
        title="User Management",
        active_page="user"
    )

@app.route('/profile/')
@login_required
def show_profile():
    return render_template(
        "profile.html", 
        title="Profile",
        active_page="profile"
    )

@app.route('/setting/')
@login_required
def setting():
    return render_template(
        "setting.html", 
        title="Settings",
        active_page="setting"
    )

if __name__ == '__main__':
    app.run(debug=True)
# Add this to your index.py
@app.errorhandler(404)
def page_not_found(e):
    return render_template('404.html'), 404

@app.errorhandler(500)
def server_error(e):
    return render_template('500.html'), 500