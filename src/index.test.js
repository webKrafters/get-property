import getProperty from '.';

const DEFAULT = '___default___';

class Parent {
	constructor({ firstName, lastName }) {
		this.firstName = firstName;
		this.lastName = lastName;
		this.range = [ 0, 1, 2, 3, 4, 5, 6 ]
	}
	get fullName () {
		return this.lastName + ', ' + this.firstName;
	}
}

class Child extends Parent {
	#flag;

	constructor( name, age ) {
		super( name );
		this.age = age;
		this.#flag = true;
	}
	get desc () {
		return this.fullName + ' | ' + this.age;
	}
}

const source = {
	company: 'VORTEXACO',
	favoriteFruit: 'banana',
	friends: [{
		id: 0,
		name: {
			first: 'Pollard',
			last: 'Hunter'
		}
	}, {
		id: 1,
		name: {
			first: 'Holly',
			last: 'Roberson'
		}
	}, {
		id: 2,
		name: {
			first: 'Carey',
			last: 'Osborne'
		}
	}],
	history: {
		places: [{
			city: 'Topeka',
			country: 'US',
			state: 'KS',
			year: '1997 - 2002'
		}, {
			city: 'Atlanta',
			country: 'US',
			state: 'GA',
			year: '2008'
		}, {
			city: 'Miami',
			country: 'US',
			state: 'FL',
			year: '2017'
		}]
	},
	nullTester: null,
	tags: [
		'minim',
		'nisi',
		'dolor',
		'in',
		'ullamco',
		'laborum',
		'proident'
	],
	classInstance: new Child({
		firstName: 'First',
		lastName: 'last'
	}, 33 )
};

describe( 'getProperty(...)', () => {
	test( 'obtains info about property located at path in a source data', () => {
		expect( getProperty( source, 'nullTester' ) ).toStrictEqual({
			_value: source.nullTester,
			exists: true,
			index: NaN,
			isSelf: false,
			key: 'nullTester',
			source: source,
			trail: [ 'nullTester' ],
			value: source.nullTester
		});
		expect( getProperty( source, 'tags.-2' ) ).toStrictEqual({
			_value: source.tags[ 5 ],
			exists: true,
			index: 5,
			isSelf: false,
			key: '-2',
			source: source.tags,
			trail: [ 'tags', 5 ],
			value: source.tags[ 5 ]
		});
		expect( getProperty( source, 'tags.5' ) ).toStrictEqual({
			_value: source.tags[ 5 ],
			exists: true,
			index: 5,
			isSelf: false,
			key: '5',
			source: source.tags,
			trail: [ 'tags', 5 ],
			value: source.tags[ 5 ]
		});
		expect( getProperty( source, 'tags.44' ) ).toStrictEqual({
			_value: undefined,
			exists: false,
			index: 44,
			isSelf: false,
			key: '44',
			source: source.tags,
			trail: [ 'tags' ],
			value: undefined
		});
		expect( getProperty( source, 'tags.length' ) ).toStrictEqual({
			_value: source.tags.length,
			exists: true,
			index: NaN,
			isSelf: false,
			key: 'length',
			source: source.tags,
			trail: [ 'tags', 'length' ],
			value: source.tags.length
		});
		expect( getProperty( source, 'friends.-3.name.last' ) ).toStrictEqual({
			_value: source.friends[ 0 ].name.last,
			exists: true,
			index: NaN,
			isSelf: false,
			key: 'last',
			source: source.friends[ 0 ].name,
			trail: [ 'friends', 0, 'name', 'last' ],
			value: source.friends[ 0 ].name.last
		});
		expect( getProperty( source, 'favoriteFruit.does.not.exist', DEFAULT ) ).toStrictEqual({
			_value: undefined,
			exists: false,
			index: NaN,
			isSelf: false,
			key: 'exist',
			source: undefined,
			trail: [ 'favoriteFruit' ],
			value: DEFAULT
		});
		expect( getProperty( source, 'history.places[1].does.not.exist', DEFAULT ) ).toStrictEqual({
			_value: undefined,
			exists: false,
			index: NaN,
			isSelf: false,
			key: 'exist',
			source: undefined,
			trail: [ 'history', 'places', 1 ],
			value: DEFAULT
		});
		expect( getProperty( source, 'classInstance' ) ).toStrictEqual({
			_value: source.classInstance,
			exists: true,
			index: NaN,
			isSelf: false,
			key: 'classInstance',
			source: source,
			trail: [ 'classInstance' ],
			value: source.classInstance
		});
		expect( getProperty( source, 'classInstance.lastName' ) ).toStrictEqual({
			_value: source.classInstance.lastName,
			exists: true,
			index: NaN,
			isSelf: false,
			key: 'lastName',
			source: source.classInstance,
			trail: [ 'classInstance', 'lastName' ],
			value: source.classInstance.lastName
		});
		expect( getProperty( source, 'classInstance.range.-1' ) ).toStrictEqual({
			_value: source.classInstance.range[ 6 ],
			exists: true,
			index: 6,
			isSelf: false,
			key: '-1',
			source: source.classInstance.range,
			trail: [ 'classInstance', 'range', 6 ],
			value: source.classInstance.range[ 6 ]
		});
		expect( getProperty( source, 'none' ) ).toStrictEqual({
			_value: undefined,
			exists: false,
			index: NaN,
			isSelf: false,
			key: 'none',
			source,
			trail: [],
			value: undefined
		});
	} );
	test( 'considers private property non-existent', () => {
		expect( getProperty( source, 'classInstance.#flag' ) ).toStrictEqual({
			_value: undefined,
			exists: false,
			index: NaN,
			isSelf: false,
			key: '#flag',
			source: source.classInstance,
			trail: [ 'classInstance' ],
			value: undefined
		});
	} );
	test( 'recognizes computed property', () => {
		expect( getProperty( source, 'classInstance.desc' ) ).toStrictEqual({
			_value: source.classInstance.desc,
			exists: true,
			index: NaN,
			isSelf: false,
			key: 'desc',
			source: source.classInstance,
			trail: [ 'classInstance', 'desc' ],
			value: source.classInstance.desc
		});
	} );
	test( 'returns source as-is with empty property paths', () => {
		const info = getProperty( source, [] );
		expect( info._value ).toBe( source );
		expect( info ).toStrictEqual( getProperty( source ) );
		expect( info ).toStrictEqual({
			_value: source,
			exists: true,
			index: NaN,
			isSelf: true,
			key: undefined,
			source: undefined,
			trail: [],
			value: source
		});
	} );
	test( 'accesses top level', () => {
		expect( getProperty( source, 'company' ).value ).toBe( source.company );
		expect( getProperty( source, [ 'company' ] ).value ).toBe( source.company );
		const bestieLastName = source.friends[ 0 ].name.last;
		[ 	'friends.0.name.last', 'friends[0].name.last',
			[ 'friends', '0', 'name', 'last' ],
			[ 'friends', 0, 'name', 'last' ],
			'friends.-3.name.last', 'friends[-3].name.last',
			[ 'friends', '-3', 'name', 'last' ],
			[ 'friends', -3, 'name', 'last' ]
		].forEach( path => expect( getProperty( source, path ).value ).toBe( bestieLastName ) );
		expect( getProperty([ 'one', 'two', 'three' ], 2 ).value ).toBe( 'three' );
		expect( getProperty([ 'one', 'two', 'three' ], -1 ).value ).toBe( 'three' );
		expect( getProperty({ 0: 'one', 1: 'two', 2: 'three' }, 2 ).value ).toBe( 'three' );
		expect( getProperty({ 0: [ 'one', 'two' ], 1: [ 'five', 'six' ] }, '1.-2' ).value ).toBe( 'five' );
	} );
	test( 'replaces inexistent value with predefined default value', () => {
		expect( getProperty( source, 'inexistent', DEFAULT ).value ).toBe( DEFAULT );
		expect( getProperty( source, [ 'inexistent' ], DEFAULT ).value ).toBe( DEFAULT );
	} );
	test( 'accesses array', () => {
		const name = source.friends[ 1 ].name;
		[ 'friends.1.name', 'friends[1].name', [ 'friends', 1, 'name' ], [ 'friends', '1', 'name' ] ].forEach( path => {
			expect( getProperty( source, path ).value ).toBe( name );
		} );
	} );
	test( 'does not access array with a non-integer corresponding key in path', () => {
		expect( getProperty( source, 'friends.a' ).value ).toBeUndefined();
	} );
	test( 'accesses array in reverse', () => {
		const name = source.friends[ 1 ].name;
		[ 'friends.-2.name', 'friends[-2].name', [ 'friends', -2, 'name' ], [ 'friends', '-2', 'name' ] ].forEach( path => {
			expect( getProperty( source, path ).value ).toBe( name );
		} );
	} );
	test( 'does not reverse-access indexed objects', () => {
		expect( getProperty( { 0: 'one', 1: 'two', 2: 'three' }, -1 ).value ).toBeUndefined();
	} );
	test( 'returns undefined immediately on reverse access error', () => {
		expect( getProperty( { 0: { name: 'one' } }, '[-1].name' ).value ).toBeUndefined();
	} );
	test( 'runs complex reverse array baseed access', () => {
		const data = {
			uuyuw: {
				654: [
					null,
					source,
					null
				]
			}
		};
		expect( getProperty( data, 'uuyuw.654.-2[history][places[-3]].year' ).value ).toBe(
			data.uuyuw[ '654' ][ 1 ].history.places[ 0 ].year
		);
	} );
	describe( 'non object source parameter', () => {
		let scalarProperty;
		beforeAll(() => {
			scalarProperty = {
				_value: undefined,
				exists: false,
				index: NaN,
				isSelf: false,
				key: 'b',
				source: undefined,
				trail: [],
				value: undefined
			};
		});
		test( 'resolves array value', () => {
			expect( getProperty( [ 22, 44, 333, { b: 90 }], '[-1].b' ) ).toStrictEqual({
				_value: 90,
				exists: true,
				index: NaN,
				isSelf: false,
				key: 'b',
				source: { b: 90 },
				trail: [ 3, 'b' ],
				value: 90
			});
		} );
		
		test( 'ignores attempts to search atomic values', () => {
			expect( getProperty( 44, '[-1].b' ) ).toStrictEqual( scalarProperty );
		} );
		test( 'ignores attempts to search null values', () => {
			expect( getProperty( null, '[-1].b' ) ).toStrictEqual( scalarProperty );
		} );
		test( 'ignores attempts to search undefined values', () => {
			expect( getProperty( undefined, '[-1].b' ) ).toStrictEqual( scalarProperty );
		} );
	} );
} );
