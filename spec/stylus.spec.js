var should = require( "should" );
var api = require( "anvil.js" );
var Harness = api.PluginHarness;

var harness = new Harness( "anvil-stylus", "./" ),
		tests = [];

harness.addFile( "./src/test.styl",
"span\n" +
"  border 1px solid black"
);

harness.expectFile( "./lib/test.css",
"span {\n" +
"  border: 1px solid #000;\n" +
"}\n" );

describe( "when compiling stylus", function() {

	before( function( done ) {
		harness.build(
			function( x, y ) {
				y.should.equal( x );
			},
			function( results ) {
				tests = results;
				done();
			}
		);
	} );

	it( "should produce expected output", function() {
		_.each( tests, function( test ) {
			test.call();
		} );
	} );

} );