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
   git clone https://github.com/ankitthakur321/product_crud_owl
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
   - Warning message about permanent deletion
   - "Delete" and "Cancel" buttons
3. Click "Delete" to permanently remove the product using ORM service (`orm.unlink()`)
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
- **Safe Guards**: Clear warning messages about permanent deletion
- **Two-Step Process**: Click delete → confirm in modal → actual deletion

## Technical Architecture

### 📡 **Data Operations**
- **ORM Service Integration**: Direct integration with Odoo's ORM service in OWL components
- **Real-time CRUD**: Create, Read, Update, Delete operations using `bindService("orm")`
- **Reactive Updates**: Automatic UI updates after ORM operations
- **Error Handling**: Comprehensive error handling for ORM operations
- **Data Validation**: Server-side validation integrated with ORM service calls

## Configuration

### 🔒 **Security**
- User access control through Odoo's standard security model
- Input validation and sanitization

### ⚙️ **Settings**
No additional configuration required. The addon works out of the box.

## License

This addon is released under the LGPL-3 license, same as Odoo Community Edition.

## Changelog

### Version 1.0.0
- Initial release
- Complete CRUD functionality with modals using ORM service
- Create/Edit product modals with rich forms and ORM integration
- Deletion confirmation modal with ORM service calls
- OWL-based frontend with modal components and reactive ORM operations
- 500-character description validation in modals with ORM constraints
- Responsive design with real-time ORM updates
- HTML editor integration in modal forms with ORM validation

---

**Built by Ankit Kumar for Odoo 17 Community Edition**