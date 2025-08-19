{
    "name": "Product CRUD OWL",
    "summary": "Standalone OWL UI for CRUD on Products (product.product) with HTML description and validations",
    "version": "17.0.1.0.0",
    "author": "Ankit Kumar",
    "website": "https://example.com",
    "license": "LGPL-3",
    "sequence": 1,
    "depends": ["base", "web", "product", "website_sale"],
    "category": "Tools",
    "data": [
        "views/product_views.xml",
        "views/templates.xml",
    ],
    "assets": {
        "web.assets_frontend": [
            # "product_crud_owl/static/src/css/product_app.scss",
            # "product_crud_owl/static/src/xml/product_templates.xml",
            "product_crud_owl/static/src/js/product_crud.js"
        ]
    },
    "installable": True,
    "application": True
}