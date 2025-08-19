# Product CRUD OWL

**Odoo 17 Community Edition Addon**

A modern, responsive product management interface built with OWL (Odoo Web Library) that provides full CRUD operations for products with a clean, minimal design.

## Features

### 🚀 **Core Functionality**
- **Complete CRUD Operations**: Create, Read, Update, Delete products
- **Modal-Based Interface**: Dedicated modals for create/edit operations
- **Confirmation Wizards**: Safe deletion with confirmation dialogs
- **OWL-Powered Frontend**: Modern JavaScript framework with reactive components
- **Minimal HTML Shell**: Custom route with no default Odoo layout
- **Responsive Design**: Clean, mobile-friendly interface

### 📋 **Product Management**
- **Product Table Display**: List all products with key information via ORM service queries
- **Modal Forms**: Dedicated create/edit modals with full form controls and ORM integration
- **Confirmation Dialogs**: Safe deletion with detailed confirmation wizards using ORM service
- **Per-row Actions**: Individual controls for each product with direct ORM operations
- **Real-time Updates**: Immediate UI updates after ORM operations without page refresh
- **Form Validation**: Real-time validation in modal forms with server-side ORM validation

### 📝 **Fields Managed**
- **Name**: Product name with validation
- **Default Code**: Internal reference/SKU
- **List Price**: Product pricing
- **Description**: Rich HTML editor with 500-character limit

### ✅ **Validation & Error Handling**
- **HTML Editor**: WYSIWYG editor for product descriptions in modals
- **Character Limit**: 500-character validation (frontend + backend via ORM)
- **Server-side Validation**: Python constraints integrated with ORM service calls
- **ORM Error Handling**: Comprehensive error handling for all ORM operations
- **Reactive Validation**: Instant validation feedback using ORM service responses

### 🎨 **UI/UX Features**
- **Clean Design**: Modern, minimalist interface
- **Modal-Based Workflow**: Intuitive create/edit modals
- **Confirmation Wizards**: User-friendly deletion confirmation
- **Responsive Layout**: Works on desktop, tablet, and mobile
- **Form Validation**: Live validation feedback in modal forms

## Installation

### Prerequisites
- Odoo 17 Community Edition
- Python 3.8+
- Modern web browser with JavaScript enabled

### Setup Steps

1. **Clone or Download** this addon to your Odoo addons directory:
   ```bash
   cd /path/to/odoo/addons
   git clone <repository-url> product_crud_owl
   ```

2. **Update Apps List**:
   - Go to Apps menu in Odoo
   - Click "Update Apps List"

3. **Install the Addon**:
   - Search for "Product CRUD OWL"
   - Click Install

4. **Access the Interface**:
   - Navigate to: `http://your-odoo-domain/products`

## Usage

### Accessing the Interface
- **URL**: `http://your-odoo-server/products`
- **Menu**: Available in the website menu after installation

### Managing Products

#### ➕ **Creating Products**
1. Click the "Add Product" button
2. A **Create Product Modal** opens with form fields:
   - **Name**: Product title (required)
   - **Default Code**: Internal reference
   - **List Price**: Product price
   - **Description**: Rich text description with WYSIWYG editor (500 char max)
3. Real-time validation with character counter
4. Click "Add" to create the product using ORM service (`orm.create()`)
5. Modal closes automatically on success with instant UI update

#### ✏️ **Editing Products**
1. Click the "Edit" button on any product row
2. An **Edit Product Modal** opens pre-populated with current data via ORM service
3. Modify any fields using the form interface:
   - Use the rich WYSIWYG editor for descriptions
   - Visual feedback for validation errors
4. Click "Update" to update changes using ORM service (`orm.write()`)
5. Click "Cancel" to discard changes
6. Modal closes automatically on successful save with reactive UI updates

#### 🗑️ **Deleting Products**
1. Click the "Delete" button on any product row
2. A **Confirmation Modal/Wizard** appears showing:
   - Product name and details fetched via ORM service
   - Warning message about permanent deletion
   - "Confirm Delete" and "Cancel" buttons
3. Click "Confirm Delete" to permanently remove the product using ORM service (`orm.unlink()`)
4. Click "Cancel" to abort the deletion
5. Product is removed from the list immediately after confirmation with automatic UI refresh

#### 📝 **Modal Forms & Validation**
- **Create Modal**: Clean form interface for new products
- **Edit Modal**: Pre-populated form for product updates  
- **Rich Text Editor**: Full WYSIWYG editor in modals with formatting toolbar
- **Form Validation**: Real-time validation with error highlighting
- **Modal Controls**: Save, Cancel, and Close buttons with proper state management
- **Responsive Modals**: Mobile-friendly modal design

#### 🔒 **Deletion Safety**
- **Confirmation Wizard**: Detailed confirmation dialog before deletion
- **Product Preview**: Shows product details in confirmation modal
- **Safe Guards**: Clear warning messages about permanent deletion
- **Two-Step Process**: Click delete → confirm in modal → actual deletion

## Technical Architecture

### 📡 **Data Operations**
- **ORM Service Integration**: Direct integration with Odoo's ORM service in OWL components
- **Real-time CRUD**: Create, Read, Update, Delete operations using `useService("orm")`
- **Reactive Updates**: Automatic UI updates after ORM operations
- **Error Handling**: Comprehensive error handling for ORM operations
- **Data Validation**: Server-side validation integrated with ORM service calls

## Configuration

### 🔒 **Security**
- User access control through Odoo's standard security model
- Input validation and sanitization

### ⚙️ **Settings**
No additional configuration required. The addon works out of the box.

### 🎨 **Customization**
To customize the interface:

1. **Modal Styling**: Modify CSS in modal component templates
2. **Form Fields**: Add/remove fields in modal components and models  
3. **Validation Rules**: Adjust limits in both frontend modals and backend
4. **Modal Behavior**: Customize modal animations and interactions
5. **Wizard Flow**: Modify confirmation wizard steps and messages

## Development

### 🛠️ **Development Setup**
1. Enable developer mode in Odoo
2. Make changes to the code
3. Restart Odoo server
4. Refresh the browser

### 🧪 **Testing**
- Test all CRUD operations using ORM service
- Verify ORM error handling scenarios
- Check reactive UI updates after ORM operations
- Verify validation works with ORM constraints (500 char limit)
- Check responsive design on different screen sizes
- Test modal interactions with ORM service calls

### 🐛 **Debugging**
- Enable debug mode in Odoo
- Check browser console for JavaScript errors
- Review Odoo logs for backend issues

## Troubleshooting

### Common Issues

#### **Products page not loading**
- Check if the addon is properly installed
- Verify the route is accessible: `/products`
- Check Odoo logs for errors

#### **JavaScript errors**
- Ensure browser JavaScript is enabled
- Check console for specific error messages
- Verify all static files are loaded

#### **Modal not opening/closing properly**
- Check OWL component state management
- Verify modal event handlers are properly bound
- Check CSS z-index and display properties
- Ensure modal backdrop events work correctly

#### **Form validation in modals not working**
- Verify character counting logic in modal components
- Check WYSIWYG editor integration in modals
- Confirm validation messages display correctly
- Test form submission prevention on validation errors

#### **ORM Service issues**
- Check if ORM service is properly imported: `useService("orm")`
- Verify component is properly mounted before ORM calls
- Check network tab for failed ORM requests
- Ensure proper error handling for ORM operations
- Verify ORM service calls use correct model names

#### **Data not updating after operations**
- Check if components properly react to ORM operation results
- Verify reactive state management after ORM calls
- Ensure UI updates are triggered after successful ORM operations
- Check if error handling prevents UI updates on failed operations

## Contributing

### 📝 **Code Standards**
- Follow Odoo development guidelines
- Use OWL best practices
- Maintain consistent code formatting
- Add comments for complex logic


## License

This addon is released under the LGPL-3 license, same as Odoo Community Edition.

## Support

For issues and questions:
1. Check the troubleshooting section
2. Review Odoo logs for detailed error messages


## Changelog

### Version 1.0.0
- Initial release
- Complete CRUD functionality with modals using ORM service
- Create/Edit product modals with rich forms and ORM integration
- Deletion confirmation wizard with ORM service calls
- OWL-based frontend with modal components and reactive ORM operations
- 500-character description validation in modals with ORM constraints
- Responsive design with modal animations and real-time ORM updates
- HTML editor integration in modal forms with ORM validation

---

**Built by Ankit for Odoo 17 Community Edition**