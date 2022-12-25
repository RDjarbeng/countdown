
export function addSortUI() {
    if (!document.querySelector(".list-settings")) {
        const listContainer = document.querySelector(".list-container");
        let sortHtml = `
        <section class="list-settings">
            <div class="sort">
                <div class="sort-options">
                    <div class="sort-opt modified">Date modified</div>
                    <div class="sort-opt due">Due date</div>
                </div>
                <div class="sort-title"><i class="fas fas fa-sort-amount-up"></i> Sort By </div>
            </div>
        </section>`;
        listContainer.insertAdjacentHTML("afterbegin", sortHtml);
    }
}
