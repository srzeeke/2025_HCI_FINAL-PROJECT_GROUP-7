const inventoryGrid = document.getElementById("inventoryGrid");
const totalCountEl = document.getElementById("totalCount");
const searchInput = document.getElementById("searchInput");
const openFilterBtn = document.getElementById("openFilterBtn");
const filterPanel = document.getElementById("filterPanel");
const closeFilterBtn = document.getElementById("closeFilterPanel");

let allProducts = [];

// Load products
fetch("products.json")
    .then(res => res.json())
    .then(data => {
        allProducts = data;

        generateFilters(allProducts);
        applyAllFilters();
    })
    .catch(err => console.error("Error loading products:", err));


// Render cards
function renderProducts(products) {
    inventoryGrid.innerHTML = "";
    totalCountEl.textContent = products.length;

    if (products.length === 0) {
        inventoryGrid.innerHTML = `
            <div class="no-results-message" style="text-align: center; padding: 2rem; color: var(--color-text-secondary);">
                <img src="https://api.iconify.design/mdi:magnify.svg?color=%236B7280" alt="" class="w-12 h-12 mx-auto mb-4 opacity-50" aria-hidden="true">
                <h3 class="text-lg font-medium text-text-primary mb-2">No products found</h3>
                <p>No product corresponding to your search</p>
            </div>
        `;
        return;
    }

    products.forEach(p => {
        const card = document.createElement("div");
        card.className = "card inventory-card";

        card.innerHTML = `
            <div class="inventory-image">
                <img src="${p.basic.imageUrl}" alt="${p.basic.itemName}" class="inventory-img">
            </div>

            <div class="inventory-content">
                <div class="inventory-header-row">
                    <div>
                        <div class="inventory-title">${p.basic.itemName}</div>
                        <div class="inventory-brand">${p.basic.brandName || ""}</div>
                    </div>
                    <span class="badge badge-${getBadgeType(p)}">
                        ${getBadgeText(p)}
                    </span>
                </div>

                <div class="inventory-info">
                    ${p.basic.strength.value}${p.basic.strength.unit} • ${p.basic.dosageForm}
                </div>

                <div class="inventory-actions">
                    <button class="btn btn-outline btn-sm">
                        Quantity : ${p.inventory.quantity}
                    </button>
                </div>
            </div>
        `;

        inventoryGrid.appendChild(card);
    });
}

// Badge helpers
function getBadgeType(product) {
    switch (product.inventory.status) {
        case "expired": return "error";
        case "warning": return "warning";
        case "out": return "secondary";
        default: return "success";
    }
}

function getBadgeText(product) {
    switch (product.inventory.status) {
        case "expired": return "Expired";
        case "warning": return "Close to expired";
        case "out": return "Out of stock";
        default: return "Up to date";
    }
}

function generateFilters(products) {
    const brandContainer = document.getElementById("brandFilters");
    const categoryContainer = document.getElementById("categoryFilters");

    if (!brandContainer || !categoryContainer) return;

    brandContainer.innerHTML = "";
    categoryContainer.innerHTML = "";

    const brands = [...new Set(
        products.map(p => p.basic?.brandName).filter(Boolean)
    )].sort();

    const categories = [...new Set(
        products
            .map(p =>
                p.basic?.category ||
                p.basic?.categoryName ||
                p.category ||
                p.categoryName
            )
            .filter(Boolean)
    )].sort();

    document.querySelector(".filter-section h4").innerHTML = `Brand <span class="text-xs text-text-secondary">(${brands.length})</span>`;


    brands.forEach(brand => {
        brandContainer.innerHTML += `
            <label>
                <input type="checkbox" value="${brand}">
                ${brand}
            </label>
        `;
    });

    categories.forEach(category => {
        categoryContainer.innerHTML += `
            <label>
                <input type="checkbox" value="${category}">
                ${category}
            </label>
        `;
    });
}

function applyAllFilters() {
    const searchValue = document.getElementById("searchInput").value.toLowerCase();

    const selectedBrands = [...document.querySelectorAll("#brandFilters input:checked")]
        .map(cb => cb.value);

    const selectedCategories = [...document.querySelectorAll("#categoryFilters input:checked")]
        .map(cb => cb.value);

    const prescriptionOnly = document.getElementById("prescriptionOnly")?.checked;

    const filtered = allProducts.filter(product => {
        const name = product.basic?.productName?.toLowerCase() || "";
        const brand = product.basic?.brandName?.toLowerCase() || "";
        const ndc = product.identification?.ndc || "";

        /* TEXT SEARCH */
        if (
            searchValue &&
            !name.includes(searchValue) &&
            !brand.includes(searchValue) &&
            !ndc.includes(searchValue)
        ) {
            return false;
        }

        /* BRAND FILTER */
        if (selectedBrands.length && !selectedBrands.includes(product.basic?.brandName)) {
            return false;
        }

        /* CATEGORY FILTER */
        const category =
            product.basic?.category ||
            product.basic?.categoryName ||
            product.category ||
            product.categoryName;

        if (selectedCategories.length && !selectedCategories.includes(category)) {
            return false;
        }

        /* PRESCRIPTION FILTER */
        if (prescriptionOnly && !product.regulatory?.prescriptionRequired) {
            return false;
        }

        return true;
    });

    renderProducts(filtered);
}

function toggleFilters() {
    const isOpen = filterPanel.classList.contains("open");

    filterPanel.classList.toggle("open", !isOpen);
    document.body.classList.toggle("filters-open", !isOpen);
}

function openFilters() {
    filterPanel.classList.add("open");
    document.body.classList.add("filters-open");
}

function closeFilters() {
    filterPanel.classList.remove("open");
    document.body.classList.remove("filters-open");
}

// Search
searchInput.addEventListener("input", (e) => {
    const q = e.target.value.toLowerCase();

    const filtered = allProducts.filter(p =>
        p.basic.itemName.toLowerCase().includes(q) ||
        p.basic.brandName.toLowerCase().includes(q) ||
        p.basic.ndcNumber.toLowerCase().includes(q)
    );

    renderProducts(filtered);
});

/* MAIN FILTER BUTTON */
openFilterBtn.addEventListener("click", (e) => {
    e.preventDefault();
    toggleFilters();
});

/* CLOSE BUTTON (✕) */
closeFilterBtn.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    closeFilters();
});

document.getElementById("resetFilters").addEventListener("click", () => {
    document.querySelectorAll("#filterPanel input[type=checkbox]")
        .forEach(cb => cb.checked = false);

    applyAllFilters();
});

document.getElementById("applyFilters").addEventListener("click", () => {
    applyAllFilters();
});

document.getElementById("searchInput").addEventListener("input", applyAllFilters);

document.addEventListener("change", (e) => {
    if (
        e.target.closest("#brandFilters") ||
        e.target.closest("#categoryFilters") ||
        e.target.id === "prescriptionOnly"
    ) {
        applyAllFilters();
    }
});

document.querySelector("form")?.addEventListener("submit", e => {
    e.preventDefault();
});

