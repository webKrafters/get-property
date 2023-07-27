const DEFAULT_VAL = {};

const RE_DELIMITER = /[\[\]|\.]+/g;

const RE_BEG_BRACKET_LAST_CHAR = /^\[/;

const RE_END_BRACKET_LAST_CHAR = /\]$/;

const RE_TYPE = /.*\s(\w+)\]$/;

const toString = Object.prototype.toString;

/**
 * An extension of the lodash.get function.
 *
 * @param {T} source
 * @param {KeyType|Array<KeyType>} [path]
 * @param {*} [defaultValue]
 * @returns {PropertyInfo}
 *
 * @template [T=any]
 *
 * @see lodash.get documentation
 */
function getProperty( source, path, defaultValue = DEFAULT_VAL ) {
	switch( getTypeName( path ) ) {
		case 'String': {
			path = path
				.replace( RE_BEG_BRACKET_LAST_CHAR, '' )
				.replace( RE_END_BRACKET_LAST_CHAR, '' )
				.split( RE_DELIMITER ); 
			break;
		}
		case 'Array': break;
		case 'Undefined': path = []; break;
		default: path = [ path ];
	}
	let _value;
	{
		const t = getTypeName( source );
		_value = t === 'Object' || t === 'Array' ? source : {};
	}
	let exists = true;
	let index = NaN;
	const trail = [];
	for( const p of path ) {
		index = NaN;
		if( Array.isArray( _value ) ) {
			let _index = +p;
			if( Number.isInteger( _index ) ) {
				if( _index < 0 ) { _index = _value.length + _index }
				index = _index
				if( index in _value ) {
					source = _value;
					_value = _value[ index ];
					trail.push( index );
					continue;
				}
			}
		}
		source = _value;
		_value = source?.[ p ];
		if( _value === undefined && !hasEntry( p, source ) ) {
			exists = false;
			break;
		}
		trail.push( p );
	}
	return {
		_value,
		exists,
		index,
		isSelf: !path.length,
		key: path?.[ path.length - 1 ],
		source: path.length && path.length - trail.length < 2 ? source : undefined,
		trail,
		value: _value ?? ( defaultValue === DEFAULT_VAL ? _value : defaultValue )
	};
}

function getTypeName( value ) { return toString.call( value ).replace( RE_TYPE, '$1' ) }

function hasEntry( key, object ) {
	try {
		return key in object
	} catch( e ) {
		return false;
	}
}

export default getProperty;

/**
 * @typedef {Object} PropertyInfo
 * @property {*} Property._value - Actual value held in object at the property path
 * @property {boolean} Property.exists
 * @property {number}  Property.index - Sanitized key corresponding to an index where the parent is an array and the key is alphanumeric integer
 * @property {boolean} Property.isSelf - Where this._value === object [valid when returning the object for an empty property path]
 * @property {KeyType} Property.key
 * @property {Array|{[x:KeyType]: *}} Property.source - Parent object supposedly containing the property at key
 * @property {Array<KeyType>} Property.trail - Property path segment representing the farthest valid property/sub property path found.
 * @property {*} Property.value - Value returned
 */

/** @typedef {number|string|symbol} KeyType */
