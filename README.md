
<p align="center">
	<a href="https://typescriptlang.org">
		<img alt="TypeScript" src="https://badgen.net/badge/icon/typescript?icon=typescript&label">
	</a>
	<a href="https://github.com/webKrafters/get-property/actions">
		<img alt="GitHub Workflow Status" src="https://img.shields.io/github/actions/workflow/status/webKrafters/get-property/test.yml">
	</a>
	<a href="https://coveralls.io/github/webKrafters/get-property">
		<img alt="coverage" src="https://img.shields.io/coveralls/github/webKrafters/get-property">
	</a>
	<img alt="NPM" src="https://img.shields.io/npm/l/@webkrafters/get-property">
	<img alt="Maintenance" src="https://img.shields.io/maintenance/yes/2032">
	<img alt="build size" src="https://img.shields.io/bundlephobia/minzip/@webkrafters/get-property?label=bundle%20size">
	<a href="https://www.npmjs.com/package/@webKrafters/get-property">
		<img alt="Downloads" src="https://img.shields.io/npm/dt/@webkrafters/get-property.svg">
	</a>
	<img alt="GitHub package.json version" src="https://img.shields.io/github/package-json/v/webKrafters/get-property">
</p>

# get-property
<ul>
	<li>Gets an object containing value and search feedback info matching a property path.</li>
	<li>Recognizes negative array indexing.</li>
</ul>

<p><b>Name:</b> get-property</p>
<p>
	<b>Install:</b><br />
	npm i -S @webkrafters/get-property<br />
	npm insall -save-dev @webkrafters/get-property<br />
</p>

<br />

## Usage:

```jsx
import getProperties from '@webkrafters/get-property';
const property = getProperties(data, path, defaultValue?); // => PropertyInfo
```

<br />

## Parameters:
<hr />
<table>
	<thead>
		<th></th>
		<th>NAME</th>
		<th>DESCRIPTION</th>
		<th>TYPE</th>
		<th>DEFAULT</th>
	</thead>
	<tbody>
		<tr>
			<td>1.</td>
			<td><b>source</b></td>
			<td>Data containing the property searched.</td>
			<td>Any</td>
			<td>N.A.</td>
		</tr>
		<tr>
			<td>2.</td>
			<td><b>path</b></td>
			<td>
				Property path to search e.g.<br />
				<code>'friends.-3.name.last'</code>,<br />
				<code>'friends.[-3].name.last'</code>,<br />
				<code>['friends', -3, 'name', 'last']</code><br />
				Negative indexes are allowed.
			</td>
			<td>
				Integer<br />
				String<br />
				Symbol<br />
				Array&lt;Integer|String|Symbol&gt;
			</td>
			<td>N.A.</td>
		</tr>
		<tr>
			<td>3.</td>
			<td>
				<b>defaultValue</b><br />
				<i>[optional]</i>
			</td>
			<td>
				Value property to return if data a tproperty path is either not found or <code>null</code> or <code>undefined</code>.
			</td>
			<td>Any</td>
			<td>Undefined</td>
		</tr>
	</tbody>
</table>
<hr />

<br />

<h2>Returned Data: <code>PropertyInfo</code></h2>
<hr />
<table>
	<thead>
		<th></th>
		<th>NAME</th>
		<th>DESCRIPTION</th>
		<th>TYPE</th>
	</thead>
	<tbody>
		<tr>
			<td>1.</td>
			<td><b>_value</b></td>
			<td>
				Actual value found at the property path. It is <code>undefined</code> if none found.
			</td>
			<td>Any</td>
		</tr>
		<tr>
			<td>2.</td>
			<td><b>exists</b></td>
			<td>True if property path found.</td>
			<td>Boolean</td>
		</tr>
		<tr>
			<td>3.</td>
			<td><b>index</b></td>
			<td>
				Sanitized key corresponding to an index if the parent is an array and and the current key is alphanumeric integer.
			</td>
			<td>Integer</td>
		</tr>
		<tr>
			<td>4.</td>
			<td><b>isSelf</b></td>
			<td>
				True if property path is pointing at the <code>source</code> argument. This occurs when <code>path</code> argument is either undefined or an empty array.
			</td>
			<td>Boolean</td>
		</tr>
		<tr>
			<td>5.</td>
			<td><b>key</b></td>
			<td>
				The final key in the <code>path</code> argument list.
			</td>
			<td>
				Integer<br />
				String<br />
				Symbol
			</td>
		</tr>
		<tr>
			<td>6.</td>
			<td><b>source</b></td>
			<td>
				Reference to the node within the <code>source</code> argument containing the property data. Will be <code>undefined</code> if property was not found.
			</td>
			<td>
				Array<br />
				Object
			</td>
		</tr>
		<tr>
			<td>7.</td>
			<td><b>trail</b></td>
			<td>
				Property path segment representing the farthest valid property/sub property path found.
			</td>
			<td>Array&lt;Integer|String|Symbol&gt;</td>
		</tr>
		<tr>
			<td>8.</td>
			<td><b>value</b></td>
			<td>
				Value returned. May contain <code>defaultValue</code> if found value is either not found or <code>null</code> or <code>undefined</code>
			</td>
			<td>Any</td>
		</tr>
	</tbody>
</table>
<hr />

<br />

# License

MIT
