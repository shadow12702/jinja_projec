from flask import Flask, render_template,url_for

app = Flask(__name__)


def get_routes():
    routes = []
    for rule in app.url_map.iter_rules():
        # Lọc ra các route cần thiết (loại bỏ các route tĩnh và route của Flask)
        if not rule.endpoint.startswith('static') and not rule.endpoint == 'None':
            routes.append({
                'endpoint': rule.endpoint,
                'methods': list(rule.methods),
                'url': rule.rule,
                'name': rule.endpoint.replace('_', ' ').title()  # Tên hiển thị đẹp hơn
            })
    return routes




def get_menu_routes():
    # Chỉ lấy các route cần hiển thị trong menu
    menu_endpoints = ['home', 'about', 'contact']
    routes = []
    for rule in app.url_map.iter_rules():
        if rule.endpoint in menu_endpoints:
            routes.append({
                'endpoint': rule.endpoint,
                'url': rule.rule,
                'name': rule.endpoint.replace('_', ' ').title()
            })
    return routes





def get_sidebar_menu():
    return [
        {
            'id': 'userItem',
            'title': 'User',
            'icon': '📦',
            'items': [
                {'name': 'Admin', 'endpoint': 'user.admin'},
                {'name': 'Customer', 'endpoint': 'user.customer'}
            ]
        },
        {
            'id': 'blogItem',
            'title': 'Blog',
            'icon': '📄',
            'items': [
                {'name': 'List', 'endpoint': 'blog.list'},
                {'name': 'Detail', 'endpoint': 'blog.detail'},
                {'name': 'Create', 'endpoint': 'blog.create'},
                {'name': 'Edit', 'endpoint': 'blog.edit'}
            ]
        }
    ]

# Gửi menu đến tất cả các route
@app.context_processor
def inject_sidebar_menu():
    return {'sidebar_menu': get_sidebar_menu()}


# Gửi menu đến tất cả các route
@app.context_processor
def inject_sidebar_menu():
    return {'sidebar_menu': get_sidebar_menu()}



@app.route('/')
def index():
    return render_template("index.html")
@app.route('/login')
def login():
    return render_template("login.html")
@app.route('/dashboard')
def dashboard():
    return render_template("dashboard.html")
@app.route('/user/')
def show_user():
    return render_template("user.html")
@app.route('/profile/')
def show_profile():
    return render_template("profile.html")







if __name__ == '__main__':
    app.run(debug=True)
