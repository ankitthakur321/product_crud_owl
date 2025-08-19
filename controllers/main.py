from odoo import _
from odoo.http import Controller, request, route
from odoo.addons.website.controllers.main import QueryURL

import logging
_logger = logging.getLogger(__name__)


class ProductsController(Controller):

    _items_per_page = 5

    @route(['/products', '/products/page/<int:page>'], type='http', auth='public', website=True)
    def list_products(self, page=0, sortby=None, **kwargs):
        values = {}
        ProductProduct = request.env['product.product']
        domain = [('website_published', '=', True)]
        searchbar_sortings = {
            'date': {'label': _('Newest'), 'order': 'create_date desc'},
            'name': {'label': _('Name'), 'order': 'name'},
        }
        rights = {
            'can_create': ProductProduct.check_access_rights('create', raise_exception=False),
            'can_write': ProductProduct.check_access_rights('write', raise_exception=False),
            'can_delete': ProductProduct.check_access_rights('unlink', raise_exception=False),
        }

        if not sortby:
            sortby = 'date'
        order = searchbar_sortings[sortby]['order']
        prod_count = ProductProduct.search_count(domain)
        pager = request.website.pager(
            url="/products",
            url_args={'sortby': sortby,},
            total = prod_count,
            page=page,
            step=self._items_per_page
        )
        products = ProductProduct.search(domain, order=order, limit=self._items_per_page, offset=pager['offset'])
        keep =  QueryURL(
            '/products',
            **self._product_get_query_url_kwargs(
                sortby=sortby,
                **kwargs,
            ),
        )
        values.update({
            'products': products,
            'page_name': 'opportunity',
            'default_url': '/products',
            'pager': pager,
            'searchbar_sortings': searchbar_sortings,
            'sortby': sortby,
            'keep': keep,
            'rights': rights,
        })
        return request.render('product_crud_owl.product_list', values)
    

    def _product_get_query_url_kwargs(
        self, sortby, **post
    ):
        return {
            'sortby': sortby,
        }