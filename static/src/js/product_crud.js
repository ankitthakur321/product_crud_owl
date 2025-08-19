/** @odoo-module **/

import publicWidget from "@web/legacy/js/public/public_widget";
import { _t } from "@web/core/l10n/translation";
import { debounce } from '@web/core/utils/timing';
import { loadWysiwygFromTextarea } from "@web_editor/js/frontend/loadWysiwygFromTextarea";

export const ProductCRUD = publicWidget.Widget.extend({
    selector: '.oe_product_list',

    events: {
        'click button.prod_edit_btn': '_onClickEditProductBtn',
        'click button.prod_update_btn': '_onClickUpdateProductBtn',
        'click button.prod_add_btn': '_onClickAddProductBtn',
        'click button.prod_delete_btn': '_onClickDeleteProductBtn',
        'click button.prod_del_btn': '_onClickConfirmDeleteProduct',
        'input input#list_price': '_onInputListPriceDebounced',
    },

    init: function () {
        this._super.apply(this, arguments);
        // Initialize inputs and buttons
        this.productId = null;
        this.nameInput = null;
        this.defaultCodeInput = null;
        this.listPriceInput = null;
        this.productDescriptionInput = null;
        this.updateButton = null;
        self.addProdwysiwyg = null;
        self.editProdwysiwyg = null;
        this.maxLength = 500;
        this.orm = this.bindService("orm");
        this.notification = this.bindService("notification");
    },

    /** Init debounced method once */
    start: function () {
        var self = this;
        this._super.apply(this, arguments);
        this._onInputListPriceDebounced = debounce(this._onChangeListPriceInput.bind(this), 300);
        $('textarea.o_wysiwyg_loader').toArray().forEach(async (textarea) => {
            var $textarea = $(textarea);
            var options = self._getTextAreaOptions();
            await loadWysiwygFromTextarea(self, $textarea[0], options).then(wysiwyg => {
                if(wysiwyg.$root.closest('div#addProductModal').length > 0) {
                    self.addProdwysiwyg = wysiwyg;
                }
                if(wysiwyg.$root.closest('div#editProductModal').length > 0) {
                    self.editProdwysiwyg = wysiwyg;
                }
                var $editableElement = self.$('.note-editable, .odoo-editor-editable');
            
                if ($editableElement.length) {
                    // Add event listeners to the editable area
                    $editableElement.on('input keyup paste', function() {
                        setTimeout(function() {
                            self.validateLength();
                        }, 50);
                    });
                }
            });
        });
    },


    /***
     * Method to get the options for the WYSIWYG editor.
     */
    _getTextAreaOptions: function () {
        var self = this;
        var options = {
            toolbarOptions: {
                showColors: true,
                showFontSize: true,
                showHistory: true,
                showHeading1: true,
                showHeading2: true,
                showHeading3: true,
                showLink: true,
                showImageEdit: true,
            },
            resizable: true,
            userGeneratedContent: true,
            height: 150,            
        };
        options.allowCommandLink = true;
        options.allowCommandImage = true;

        return options;
    },

    _onChangeListPriceInput: function (ev) {
        // Handle the change event for the list price input field
        const input = ev.currentTarget;
        const rawValue = input.value.trim();
        const validNumber = /^-?\d+(\.\d+)?$/;
        if (!validNumber.test(rawValue)) {
            input.classList.add("is-invalid");
            var message = _t('The list price must be a valid number (e.g. 100 or 100.50).');
            this.notification.add(message, {
                type: "danger",
                sticky: false,
            });
        } else {
            input.classList.remove("is-invalid");
            input.value = rawValue;
        }
    },


    /**
     * Method to handle the edit product button click event.
     * It fetches the product data and populates the modal input fields for editing.
     */
    _onClickEditProductBtn: function (ev) {
        var self = this; 
        ev.preventDefault();
        self.productId = $(ev.currentTarget).data('product-id');
        const modal = document.getElementById('editProductModal');
        if (modal) {
            self.nameInput = modal.querySelector('#name');
            self.defaultCodeInput = modal.querySelector('#default_code');
            self.listPriceInput = modal.querySelector('#list_price');
            self.productDescriptionInput = modal.querySelector('#product_description');
            // Fetch product data from the server (this is a placeholder, implement actual data fetching)
            this._fetchProductData(self.productId).then(product => {
                if (product) {
                    self.nameInput.value = product.name || '';
                    self.defaultCodeInput.value = product.default_code || '';
                    self.listPriceInput.value = product.list_price || '';
                    self.editProdwysiwyg.setValue(product.product_description || '');
                }
            });
            // Show the modal
            $(modal).modal('show');
        }

    },

    stripHtmlTags: function(html) {
        // Create a temporary div to strip HTML tags and get plain text
        var tempDiv = document.createElement('div');
        tempDiv.innerHTML = html;
        return tempDiv.textContent || tempDiv.innerText || '';
    },


    /** * Method to validate the length of the product description.
     * It checks if the description exceeds the maximum length and shows a notification if it does.
     */
    validateLength: function() {
        const activeEditModal = $("div#editProductModal.modal.show");
        const activeAddModal = $("div#addProductModal.modal.show");
        if(activeEditModal.length > 0) {
            var edit_content = this.editProdwysiwyg.getValue();
            var textEditContent = this.stripHtmlTags(edit_content);
            if (textEditContent.length > this.maxLength) {
                $('#product_description').addClass("is-invalid");
                var message = _t('Description cannot exceed 500 characters.');
                this.notification.add(message, {
                    type: "danger",
                    sticky: false,
                });
                return false;
            }
        }
        else if(activeAddModal.length > 0) {
            var add_content = this.addProdwysiwyg.getValue();
            var textAddContent = this.stripHtmlTags(add_content);
            if (textAddContent.length > this.maxLength) {
                $('#product_description').addClass("is-invalid");
                var message = _t('Description cannot exceed 500 characters.');
                this.notification.add(message, {
                    type: "danger",
                    sticky: false,
                });
                return false;
            }
        }
        
        $('#product_description').removeClass("is-invalid");
        return true;
    },

    /**
     * Method to handle the update product button click event.
     * It collects the data from the input fields and calls the ORM write method to update the product.
     */
    _onClickUpdateProductBtn: function (ev) {
        var self = this;
        ev.preventDefault();
        const modal = document.getElementById('editProductModal');
        const descriptionHtml = self.editProdwysiwyg.getValue(); 
        const productData = {
            name: self.nameInput.value,
            default_code: self.defaultCodeInput.value,
            list_price: parseFloat(self.listPriceInput.value) || 0,
            product_description: descriptionHtml,
        };
        this._updateProductData(self.productId, productData).then(response => {
            if (response.success) {
                $(modal).modal('hide');
                self._refreshProductList(productData);
                
            } else {
                console.error('Failed to update product:', response.error);
            }
        });
    },

    /**
     * Method to handle the add product button click event.
     * It collects the data from the input fields and calls the ORM create method to add a new product.
     */
    _onClickAddProductBtn: function (ev) {
        var self = this;
        ev.preventDefault();
        const modal = document.getElementById('addProductModal');
        if (modal) {
            self.nameInput = modal.querySelector('#name');
            self.defaultCodeInput = modal.querySelector('#default_code');
            self.listPriceInput = modal.querySelector('#list_price');
            // self.productDescriptionInput = modal.querySelector('#product_description');
            const descriptionHtml = self.addProdwysiwyg.getValue();
            const productData = {
                name: self.nameInput.value,
                default_code: self.defaultCodeInput.value,
                list_price: parseFloat(self.listPriceInput.value).toFixed(2) || 0,
                product_description: descriptionHtml,
            };
            this._addProductData(productData).then(product => {
                window.location.reload(); // Reload the page to see the new product
                $(modal).modal('hide');
            });
            // hide the modal
        }
    },

    /**
     * Calls ORM create method to add a new product with the entered data.
     * Returns the product ID of the newly created product.
     */
    _addProductData: async function (productData) {
        const productId = await this.orm.create(
            "product.product",
            [{  
                name: productData.name,
                default_code: productData.default_code,
                list_price: productData.list_price, 
                product_description: productData.product_description,
                website_published: true,
            }]
        );
        // Fetch the newly created product data to return
        return productId || null;
    },


    /**
     * Calls ORM read method to read the product details using the productId.
     */

    _fetchProductData: async function (productId) {

        const [productData] = await this.orm.read(
                "product.product",
                [productId],
                ["id", "name", "default_code", "list_price", "product_description"],
                { load: false }
            );
        return productData || {};
    },

    /**
     * Calls ORM write method to update the product details with the entered data.
     */
    _updateProductData: function (productId, product_data) {
        return this.orm.write(
            "product.product",
            [productId],
            {
                name: product_data.name,
                default_code: product_data.default_code,
                list_price: product_data.list_price,
                product_description: product_data.product_description,
            }
        ).then(() => {
            return { success: true };
        }).catch((error) => {
            console.error('Error updating product:', error);
            return { success: false, error: error.message };
        });
    },


    /**
     * Method to update the product details of updated product without reloading the page.
     */
    _refreshProductList: function (productData) {
        var self = this;
        const row = self.$el.find(`tr[data-product-id='${self.productId}']`);
        row.find('span.col-name').text(productData.name);
        row.find('span.col-code').text(productData.default_code);
        row.find('span.col-price').text(productData.list_price);
        row.find('span.col-description').html(productData.product_description);
    },


    /**
     * Method to set the product_id and open the delete product modal.
     */
    _onClickDeleteProductBtn: function (ev) {
        var self = this; 
        ev.preventDefault();
        self.productId = $(ev.currentTarget).data('product-id');
        const modal = document.getElementById('deleteProductModal');
        if (modal) {
            // Show the modal
            $(modal).modal('show');
        }
    },

    /**
     * Method to delete the product using ORM unlink method and remove the product row from the list.
     */
    _onClickConfirmDeleteProduct: function (ev) {
        var self = this; 
        ev.preventDefault();
        if (self.productId) {
            this.orm.unlink("product.product", [self.productId]).then(() => {
                // Hide the modal
                const modal = document.getElementById('deleteProductModal');
                $(modal).modal('hide');
                // Remove the product row from the list
                self.$el.find(`tr[data-product-id='${self.productId}']`).remove();
            }).catch((error) => {
                console.error('Error deleting product:', error);
            });
        } else {
            console.error('No product ID to delete');
        }
    },


});

publicWidget.registry.ProductCRUD = ProductCRUD;