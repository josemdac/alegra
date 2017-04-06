
function listContacts(data, targetID){
//var l = locale["es"];
fields = ["id", "name", "identification", "email", "phonePrimary", "phoneSecondary", "fax", "mobile", "observations"]	

//Preparing data for grid set	
dataList = []
data.forEach(function(item, i){
	dataList[i] = {}
	fields.forEach(function(f){
		dataList[i][f] = item[f];
		})
	
	})
var columns = []	
fields.forEach(function(item){
	columns[columns.length] = { header: l[item], dataIndex: item, autoSizeColumn: true}
	})
Ext.create('Ext.data.Store', {
    storeId:'contactStore',
    fields:fields,
    data:{'items':dataList },
    proxy: {
        type: 'memory',
        reader: {
            type: 'json',
            root: 'items'
        }
    }
});

Ext.create('Ext.grid.Panel', {
    title: 'Contact',
    id: 'tabla',
    store: Ext.data.StoreManager.lookup('contactStore'),
    columns: columns,
    height: 400,
    width: '100%',
    renderTo: targetID
});
}

function loadForm(targetID){
	
	//l = locale["es"];
	basicFields = [{
			fieldLabel: l['id'],
			name: 'id',
			allowBlank: false,
			disabled: true
			},{
			fieldLabel: l['name'],
			name: 'name',
			allowBlank: false,
			disabled: false
			},{
			fieldLabel: l['identification'],
			name: 'identification',
			allowBlank: false,
			disabled: false
			},{
			fieldLabel: l['email'],
			name: 'email',
			allowBlank: false,
			disabled: false,
			vtype: 'email'
			},{
			fieldLabel: l['phonePrimary'],
			name: 'phonePrimary',
			allowBlank: false,
			disabled: false,
			},{
			fieldLabel: l['phoneSecondary'],
			name: 'phoneSecondary',
			allowBlank: false,
			disabled: false	
			},{
			fieldLabel: l['fax'],
			name: 'fax',
			allowBlank: false,
			disabled: false	
			},{
			fieldLabel: l['mobile'],
			name: 'mobile',
			allowBlank: false,
			disabled: false	
			},{
			fieldLabel: l['observations'],
			name: 'observations',
			allowBlank: false,
			disabled: false	
			}];
	//creating special fields
	priceListField = {	xtype: 'fieldset',
			title: l['priceList'],
			collapsed: true,
			name: 'priceList',
			defaultType: 'textfield',
			collapsible: true,
			padding: 0.5,
			defaults: {
                        anchor: '100%',
                    },
			// The body area will contain three text fields, arranged
			// horizontally, separated by draggable splitters.
			layout: 'vbox',
			items: [{
				//xtype: 'textfield',
				fieldLabel: l['id'],
				name: 'id',
			}, {
				//xtype: 'splitter',
				fieldLabel: l['name'],
				name: 'name',
			}]}
		
	
	sellerField = {
			xtype: 'fieldset',
			collapsed: true,
			title: l['seller'],
			name: 'seller',
			defaultType: 'textfield',
			collapsible: true,
			padding: 0.5,
			defaults: {
                        anchor: '100%',
                    },
			// The body area will contain three text fields, arranged
			// horizontally, separated by draggable splitters.
			layout: 'vbox',
			items: [{
				//xtype: 'textfield',
				fieldLabel: l['id'],
				name: 'id',
			}, {
				//xtype: 'splitter',
				fieldLabel: l['name'],
				name: 'name',
			},{
				//xtype: 'splitter',
				fieldLabel: l['observations'],
				name: 'observations',
			}, {
				//xtype: 'splitter',
				fieldLabel: l['identification'],
				name: 'identification',
			}]}
	
	termField = {
			xtype: 'fieldset',
			title: l['term'],
			collapsed: true,
			name: 'term',
			defaultType: 'textfield',
			collapsible: true,
			padding: 0.5,
			defaults: {
                        anchor: '100%',
                    },
			width: '100%',
			// The body area will contain three text fields, arranged
			// horizontally, separated by draggable splitters.
			layout: 'vbox',
			items: [{
				//xtype: 'textfield',
				fieldLabel: l['id'],
				name: 'id',
			}, {
				//xtype: 'splitter',
				fieldLabel: l['name'],
				name: 'name',
			},{
				//xtype: 'splitter',
				fieldLabel: l['days'],
				name: 'days',
			}]}
	
	addressField = {
			xtype: 'fieldset',
			title: l['address'],
			collapsed: true,
			name: 'address',
			defaultType: 'textfield',
			collapsible: true,
			padding: 0.5,
			defaults: {
                        anchor: '100%',
                    },
			// The body area will contain three text fields, arranged
			// horizontally, separated by draggable splitters.
			layout: 'vbox',
			items: [{
				//xtype: 'textfield',
				fieldLabel: l['address'],
				name: 'address',
			}, {
				//xtype: 'splitter',
				fieldLabel: l['city'],
				name: 'city',
			}]}
	
	typeField= {
			xtype: 'fieldset',
			title: l['type'],
			name: 'type',
			defaultType: 'checkbox',
			padding: '5',
			defaults: {
                        anchor: '100%',
                    },
			// The body area will contain three text fields, arranged
			// horizontally, separated by draggable splitters.
			layout: 'anchor',
			items: [{
				fieldLabel: l['client'],
				name: 'client',
				value: 'client',
			}, {
				fieldLabel: l['provider'],
				name: 'provider',
				value: 'provider'
			}]}
	
	dataset = []
						
	
					
	internalContactsField = [Ext.create('Ext.data.Store', {
				storeId:'internalC',
				fields: ['id','name','lastname','email','phone','mobile' ],
				data:{ 'items': dataset},
				proxy: {
						type: 'memory',
						reader: {
							type: 'json',
							root: 'items'
							}
						}
					}),
					
			Ext.create('Ext.grid.Panel', {
				title: l['internalContacts'],
				id: 'tabla',
				store: Ext.data.StoreManager.lookup('internalC'),
				columns: [
					{header: l['id'],  dataIndex: 'id', autoSizeColumn: true},
					{header: l['name'], dataIndex: 'name', autoSizeColumn: true},
					{header: l['lastName'], dataIndex: 'lastName', autoSizeColumn: true},
					{header: l['email'], dataIndex: 'email', autoSizeColumn: true},
					{header: l['phone'], dataIndex: 'phone', autoSizeColumn: true},
					{header: l['mobile'], dataIndex: 'mobile', autoSizeColumn: true},
					
				],
				height: 150,
				width: '100%'
			}),
			Ext.form.Panel({
				id : "subform",
				title: l['internalContacts'], 
				defaultType: 'textfield',
				items: [{
						fieldLabel: l['id'],
						name: 'id',
						allowBlank: false,
						width: '5'
						
					}, {
						fieldLabel: l['name'],
						name: 'name',
						allowBlank: false,
					},{
						fieldLabel: l['lastName'],
						name: 'lastName',
						allowBlank: false,
					},{
						fieldLabel: l['email'],
						name: 'email',
						vtype: 'email',
						allowBlank: false,
					},{
						fieldLabel: l['phone'],
						name: 'phone',
						allowBlank: true,
					},{
						fieldLabel: l['mobile'],
						name: 'mobile',
						allowBlank: true,
					}],
					buttons: [{
					text: l['addInternal'],
					formBind: true, //only enabled once the form is valid
					handler: function(btn) {
						intC = {}
							if(Ext.getCmp('subform').items.items){
							valid = true;
							Ext.getCmp('subform').items.items.forEach(function(item){
							intC[item.name] = item.value;
								valid = valid && item.isValid()

								})
							if(valid){
							Ext.getCmp('tabla').items.items[0].getStore().add(intC);
									}
								}
							}
						},{
						text: l['remove'],
						formBind: true, //only enabled once the form is valid
						handler: function(btn) {
							sel = Ext.getCmp('tabla').items.items[0].getSelection()[0];
							Ext.getCmp('tabla').items.items[0].getStore().remove(sel);
							}
						}	
							]})
			];
		
	
	formAdd = Ext.form.Panel({
		id: 'contact_form',
		title: l['editContact'],
		width: '100%',
		defaults: {
        anchor: '90%'
		},

		// Campos del contacto
		defaultType: 'textfield',
		padding: 0.5,
		items: basicFields.concat([priceListField, sellerField, termField, addressField, typeField]),
		
	})
	
	formActions = Ext.form.Panel({
		id: 'buttonset',
		width: '100%',
		defaults: {
        anchor: '90%'
		},

		// Campos del contacto
		defaultType: 'textfield',
		padding: 0.5,
		buttons: [{
					text: l['save'],
					handler: function(){
						storeContact()
						}
				},{
					text: l['reset'],
					handler: function(){
						resetForm()
						}
				}]
		
		})
	
	
	
	Ext.create('Ext.panel.Panel', {
	items: [formAdd, internalContactsField[1], internalContactsField[2], formActions ],
	renderTo: targetID,
	})

}


function collectValues(){
//	var l = locale["es"];
	data =  {};
	Ext.getCmp('contact_form').items.items.forEach(function(item){
		
		
		if(item.items){
			subdata = {}
			item.items.items.forEach(function(subitem){
				if(subitem.value){
					subdata[subitem.name] = unescape(encodeURIComponent(subitem.value));
					}
				})
			if(Object.keys(subdata).length){
					data[item.name] = subdata;
				}
			}else{
			if(item.value){
				data[item.name] = unescape(encodeURIComponent(item.value));	
			}
				}
		//Valores de tabla
		tabla = Ext.getCmp("tabla").items.items[0].getStore()['data'].items;
		els = [];
		tabla.forEach(function(item, i){
			el = {}
			Object.keys(item['data']).forEach(function(f, u){
					el[f] = item['data'][f];
				});
			els[els.length] = el;
			
			});
		
		data["internalContacts"] = els;
			
		})
		return data;
	}
function fillValues(data){
//	var l = locale["es"];
	Ext.getCmp('contact_form').items.items.forEach(function(item){
		
		
		if(item.items){
			subdata = {}
			item.items.items.forEach(function(subitem){
				subitem.setValue(data[item.name][subitem.name]);
				})
			
			}else{
			item.setValue(data[item.name]);	
				}
		//Valores de tabla
		tabla = Ext.getCmp("tabla").items.items[0].getStore();
		els = [];
		tabla
		if(data["internalContacts"]){
		data["internalContacts"].forEach(function(item, i){
			tabla.add(item);
			});
		}
		})
		return data;
	}

function resetForm(){
	
	Ext.getCmp('contact_form').items.items.forEach(function(item){
		
		
		if(item.items){
			subdata = {}
			item.items.items.forEach(function(subitem){
				subitem.setValue("");
				
				})
			
			}else{
			item.setValue("");	
				}
		//Valores de tabla
		tabla = Ext.getCmp("tabla").items.items[0].getStore();
		tabla.removeAll();
		})
		return
	}

function showActionButtons(targetID){
//	var l = locale["es"];
	Ext.create('Ext.form.Panel', {
		id: 'actions',
		width: '100%',
		defaults: {
        anchor: '90%'
		},
		
		border: false,
		// Campos del contacto
		defaultType: 'textfield',
		padding: 0.5,
		buttons: [{
					id: "edit_button",
					text: l['update'],
					disabled: false,
					handler: function(){
						editContact()
						}
				},{
					id: "add_button",
					text: l['add'],
					disabled: false,
					handler: function(){
						addContact()
						}
				},{
					id: "del_button",
					text: l['delete'],
					disabled: false,
					handler: function(){
						deleteContact()
						}
				}],
		renderTo: targetID
		
		})
	//Edit
	//Add
	//Del
	}

function displayAccessForm(targetID){
//	var l = locale["es"];
	langs = Ext.create('Ext.data.Store', {
    fields: ['code', 'name'],
    data : [
        {"code":"es", "name":"Español"},
        {"code":"en", "name":"English"},
    ]
	});
	
	langField = Ext.create('Ext.form.ComboBox', {
	id: "language",
    fieldLabel: "Choose your language",
    store: langs,
    queryMode: 'local',
    displayField: 'name',
    valueField: 'code',
	});
	
	Ext.create('Ext.form.Panel',{
		id: 'user_form',
		title: l['userdata_request'],
		width: '100%',
		defaults: {
			anchor: '90%'
			},

		// Campos del contacto
		defaultType: 'textfield',
		items: [{
					fieldLabel: l['email'],
					name: 'email',
					vtype: 'email',
					allowBlank: false,
				},{
					fieldLabel: l['token'],
					name: 'token',
					allowBlank: false,
				},langField],
		buttons: [{
					id: l["ok_button"],
					text: l['ok'],
					handler: function(){
						submitAccess();
						}
					
				}],
		renderTo: targetID
		
	})
	//Default value
	Ext.getCmp('language').setValue("es")
	
	}

//

	
