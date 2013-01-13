/*
	anvil-stylus - Stylus extension for anvil.js
	version:	0.1.0
	author:		Alex Robson <alex@sharplearningcurve.com> (http://sharplearningcurve.com)
	copyright:	2011 - 2012
	license:	Dual licensed
				MIT (http://www.opensource.org/licenses/mit-license)
				GPL (http://www.opensource.org/licenses/gpl-license)
*/
var stylus;

module.exports = function( _, anvil ) {
	return anvil.plugin( {
		name: "anvil.stylus",
		config: {
			"options": {}
		},
		
		configure: function( config, command, done ) {
			anvil.addCompiler( ".styl", this, "text/css" );
			done();
		},

		compile: function( content, done ) {
			if( !stylus ) {
				stylus = require( "stylus" );
			}
			try {
				var compile = stylus.render(
					content,
					anvil.config[ this.name ].options || {},
					function( err, css ) {
						if( err ) {
							done( "", err );
						} else {
							done( css );
						}
					}
				);
			} catch ( error ) {
				done( "", error );
			}
		},

		rename: function( name ) {
			return name.replace( ".styl", ".css" );
		}
	} );
};