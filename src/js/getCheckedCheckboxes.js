export const getCheckedCheckBoxes = () => {
    const checkboxesChecked = []
    let checkboxes = document.querySelectorAll(".checkbox");
    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            checkboxesChecked.push(checkbox.dataset.id); // положим в массив выбранный
        }
    })
    return checkboxesChecked; // для использования в нужном месте
}