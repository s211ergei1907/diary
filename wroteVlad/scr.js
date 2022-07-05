
document.getElementById("app").innerHTML = `
    <h1>Hello Vanilla!</h1>
    <input type="file" id="fileInput">
    <img id="img" style="width: 300px">
    <div>
    We use the same configuration as Parcel to bundle this sandbox, you can find more
    info about Parcel
    <a href="https://parceljs.org" target="_blank" rel="noopener noreferrer">here</a>.
    </div>
`;

const myNotes = [
{
    title: "My first NOTE",
    body: "lorem lorem lorem lorem",
    createDate:
    String(new Date().getDate()).padStart(2, 0) +
    "." +
    String(new Date().getMonth() + 1).padStart(2, 0) +
    "." +
    new Date().getFullYear(),
    lastModified: Date.now() + 1000,
    imgs: []
},
{
    title: "My first NOTE",
    body: "lorem lorem lorem lorem",
    createDate: "24.05.2022",
    lastModified: Date.now() + 1000,
    imgs: []
},
{
    title: "My first NOTE",
    body: "lorem lorem lorem lorem",
    createDate: "24.05.2022",
    lastModified: Date.now() + 1000,
    imgs: []
}
];