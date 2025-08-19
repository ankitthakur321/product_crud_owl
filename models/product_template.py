from odoo import models, fields, api, exceptions
import re
from html import unescape


class ProductTemplate(models.Model):
    _inherit = 'product.template'


    product_description = fields.Html() 


class ProductProduct(models.Model):
    _inherit = 'product.product'


    product_description = fields.Html()

    @api.constrains('product_description')
    def _check_product_description_length(self):
        for record in self:
            if record.product_description:
                # Strip HTML tags and decode HTML entities
                plain_text = self._strip_html_tags(record.product_description)
                if len(plain_text) > 500:
                    raise exceptions.ValidationError(
                        f"Product description cannot exceed 500 characters. "
                        f"Current length: {len(plain_text)} characters."
                    )
    
    def _strip_html_tags(self, html_content):
        """Remove HTML tags and decode HTML entities"""
        if not html_content:
            return ""
        
        # Remove HTML tags
        clean_text = re.sub(r'<[^>]+>', '', html_content)
        
        # Decode HTML entities like &nbsp;, &amp;, etc.
        clean_text = unescape(clean_text)
        
        # Clean up extra whitespace
        clean_text = re.sub(r'\s+', ' ', clean_text).strip()
        
        return clean_text