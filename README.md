# Element Factory

## Intro
Element Factory is a dependency-free, light-weight tool for quickly creating HTML complete with attributes and ancestors inside of your JS.

## Installation & Inclusion
Install it with:
```
npm i html-element-factory
```
Bring into your project:
```
const elementFactory = require('html-element-factory');
// Or using ES Modules:
import elementFactory from 'html-element-factory';
```

## Usage
[(You can also check the mini wiki page)](https://github.com/RRResident/element-factory/wiki/Documentation)

To introduce by example, let's say we want to create a `div` element, with a class and an id. With vanilla JS we'd do something like this
```javascript
const div = document.createElement('div');
div.className = 'foo';
div.id = 'bar';
```
With `elementFactory`, we pass in an array where the first value is the type of element we want to create, the remaining items can be strings of `'attribute=value'`, so the above example can be created as:
```javascript
elementFactory(['div', 'class=foo', 'id=bar']);
// <div class="foo" id="bar"></div>
```

You can pass in any valid HTML attributes, or boolean attributes (such as `'disabled'`). It also supports `text=` for text content, and `html=` for inner HTML. 

To create child elements, we just need to pass in an array with our other items, the array should be structured the same as your main array, with the first value as the type of element and the remaining values as attributes, or even other arrays, which in turn will create grandchildren and so on. 
```javascript
elementFactory([
    'div',
    [
        'span',
        'class=child',
        'text=this is a child'
    ]
]);
/*
 * <div>
 *     <span class="child">This is a child</span>
 * </div>
/*
```

`elementFactory` can quickly create multiple children by adding [element]*[number] such as `'div*2'`. 
```javascript
elementFactory([
    'ul',
    ['li*5']
]);
/*
 * <ul>
 *     <li></li>
 *     <li></li>
 *     <li></li>
 *     <li></li>
 *     <li></li>
 * </ul>
/*
```

Using this we can build out a lot of HTML quickly, here is an example of a table
```javascript
elementFactory([
    'table',
    [
        'thead',
        [
            'tr',
            [
                'th*2',
                'text=header'
            ]
        ]
    ],
    [
        'tbody',
        [
            'tr*3',
            [
                'td*2',
                'text=cell'
            ]
        ]
    ]
])
```

Which builds the following

```html
<table>
    <thead>
        <tr>
            <th>header</th>
            <th>header</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>cell</td>
            <td>cell</td>
        </tr>
        <tr>
            <td>cell</td>
            <td>cell</td>
        </tr>
        <tr>
            <td>cell</td>
            <td>cell</td>
        </tr>
    </tbody>
</table>
```

## Browser support
Will work on browsers that support ES5 out of the box, the DOM APIs in use are supported on all modern browsers and IE8+