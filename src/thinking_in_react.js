import { useState } from "react";

const PRODUCTS = [
    { category: "Fruits", price: "$1", stocked: true, name: "Apple" },
    { category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit" },
    { category: "Fruits", price: "$2", stocked: false, name: "Passionfruit" },
    { category: "Vegetables", price: "$2", stocked: true, name: "Spinach" },
    { category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin" },
    { category: "Vegetables", price: "$1", stocked: true, name: "Peas" }
];

function ProductCategory({ category }) {
    return (
        <tr>
            <th colSpan='2'>{category}</th>
        </tr>
    );
}

function ProductRow({ product }) {
    const name = product.stocked ? product.name : <span style={{ color: 'red' }}>{product.name}</span>;
    return (
        <tr>
            <td>{name}</td>
            <td>{product.price}</td>
        </tr>
    );
}

function ProductTable({ products, filterText, isStockOnly }) {
    let rows = []
    let lastCategory = null

    products.forEach(product => {
        if (product.name.toLowerCase().indexOf(filterText.toLowerCase()) === -1) {
            return
        }

        if (isStockOnly && !product.stocked) {
            return
        }

        if (lastCategory !== product.category) {
            rows.push(
                <ProductCategory category={product.category} />
            );
        }

        rows.push(
            <ProductRow product={product} />
        );

        lastCategory = product.category
    });

    return (
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Price</th>
                </tr>
            </thead>
            <tbody>
                {rows}
            </tbody>
        </table>
    );
}

function SearchBar({ filterText, isStockOnly, onFilterTextChange, onInStockOnlyChange }) {
    return (
        <form>
            <div>
                <input
                    type="text"
                    placeholder="Search..."
                    value={filterText}
                    onChange={i => onFilterTextChange(i.target.value)}
                />
            </div>

            <label>
                <input
                    type="checkbox"
                    value={isStockOnly}
                    onChange={i => onInStockOnlyChange(i.target.checked)}
                />
                {' '}
                Only show products in stock
            </label>
        </form>
    );
}

function Product() {
    const [filterText, setFilterText] = useState('a');
    const [isStockOnly, setIsStockOnly] = useState(false);

    function onFilterTextChange(text) {
        setFilterText(text)
    }

    function onInStockOnlyChange(isCheck) {
        setIsStockOnly(isCheck)
    }

    return (
        <div>
            <SearchBar
                filterText={filterText}
                isStockOnly={isStockOnly}
                onFilterTextChange={onFilterTextChange}
                onInStockOnlyChange={onInStockOnlyChange}
            />
            <ProductTable
                products={PRODUCTS}
                filterText={filterText}
                isStockOnly={isStockOnly}
            />
        </div>
    );
}

export default Product