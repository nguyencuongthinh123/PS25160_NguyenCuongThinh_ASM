var arr_hinh = [
    "hinh/Hinh0.jpg",
    "hinh/Hinh1.jpg",
    "hinh/Hinh2.jpg",
    "hinh/Hinh3.jpg",
    "hinh/Hinh4.jpg",
    "hinh/Hinh5.jpg",
    "hinh/Hinh6.jpg",
    "hinh/Hinh7.jpg",
    "hinh/Hinh8.jpg",
]
var index = 0;
function prev() {
    index--;
    if (index < 0)  index = arr_hinh.length -1; 
    var hinh = document.getElementById("hinh");
    hinh.src = arr_hinh[index];
}
function next() {
    index++;
    if (index >= arr_hinh.length)  index = 0; 
    var hinh = document.getElementById("hinh");
    hinh.src = arr_hinh[index];
}
setInterval("next()", 5000);

function themvaogiohang(x){
    var giohang = new Array();
    var gh_str = sessionStorage.getItem("ssgiohang");
    if(gh_str != null) giohang = JSON.parse(gh_str);
    var countsp = sessionStorage.getItem("countsp");
    if(countsp == null) countsp = 0;
    var boxsp = x.parentElement.children;
    var hinh = boxsp[0].children[0].src;
    var gia = boxsp[1].children[0].innerText;
    var tensp = boxsp[2].innerText;
    var soluong =parseInt(boxsp[3].value);
    var sp = new Array(hinh,gia,tensp,soluong);

    var coroi = 0;
    for(let i = 0; i< giohang.length ; i++){
        if(giohang[i][2] == tensp){
            var sl = giohang[i][3];
            sl += soluong;
            giohang[i][3] = sl;
            coroi = 1;
            break;
        }
    }
    if(coroi == 0){
        giohang.push(sp);
        countsp++;
    }
    sessionStorage.setItem("ssgiohang", JSON.stringify(giohang));
    sessionStorage.setItem("countsp", countsp);
    showcountsp();
}

function showcountsp() {
    var countsp = sessionStorage.getItem("countsp");
    if(countsp == null) countsp = 0;
    document.getElementById("countsp").innerHTML = countsp;
}

function tinhlaidon(x) {
    var gh_str = sessionStorage.getItem("ssgiohang");
    var giohang = JSON.parse(gh_str);
    var tr = x.parentElement.parentElement;
    var dg = parseInt(tr.children[3].innerHTML);
    var sl = x.value;
    var tt = parseInt(tr.children[5].innerHTML);
    var tongdon = document.getElementById("tongtien").innerText;
    tongdon -= tt;
    var tensp = tr.children[2].innerText;
    if (sl == 0) {
    dongy = confirm("về 0 sẽ xóa hàng.OK?");
        if (dongy == true) {
            tr.remove();
        }
        for (let i = 0; i < giohang.length; i++) {
            if (giohang[i][1] == tensp) {
                giohang.splice(i, 1);
            }
        }
        var countsp = parseInt(sessionStorage.getItem("countsp") - 1);
        sessionStorage.setItem("countsp", countsp);
        showcountsp();
    } else {
        for (let i = 0; i < giohang.length; i++) {
            if (giohang[i][1] == tensp) {
                giohang[i][3] = sl;
            }
        }
        tt = dg * sl;
        tr.children[5].innerHTML = tt;
        tongdon += tt;
    }
    document.getElementById("tongtien").innerHTML = tongdon;
    sessionStorage.setItem("ssgiohang", JSON.stringify(giohang));
}

function showcart() {
    var x = document.getElementById("showcart");
   if(x.style.display == "block"){
        x.style.display = "none";
   }else {
        x.style.display = "block";
        showgiohang();
   }
}

function showgiohang() {
    var gh_str = sessionStorage.getItem("ssgiohang");
    var giohang = JSON.parse(gh_str);
    var ttgh = "";
    var tong = 0;
    for(let i = 0; i< giohang.length ; i++){
        var tt = parseInt(giohang[i][1])*parseInt(giohang[i][3]);
        tong += tt;
        ttgh += `
            <tr>
                <td>${i+1}</td>
                <td><img src ="${giohang[i][0]}"></td>
                <td>${giohang[i][2]}</td>
                <td>${giohang[i][1]}</td>
                <td>${giohang[i][3]}</td>
                <td>
                    <div>${tt}</div>
                </td>
                <td>
                    <button onclick="xoasp(this)" >Xóa</button>
                </td>
            </tr>
        `
    }
        ttgh += `
            <tr>
                <th colspan="5">Tổng đơn hàng</th>
                <th id="tongtien" colspan="2">${tong}</th>
            </tr>
        `
        document.getElementById("mycart").innerHTML = ttgh ;
}

function xoasp(x) {
    var gh_str = sessionStorage.getItem("ssgiohang");
    var giohang = JSON.parse(gh_str);
    
    var tr = x.parentElement.parentElement;
    var tensp = tr.children[2].innerText;
    tr.remove();
    for(let i = 0; i< giohang.length ; i++){
        if(giohang[i][2] == tensp){
            giohang.splice(i, 1);
            var countsp = parseInt(sessionStorage.getItem("countsp") - 1);
            sessionStorage.setItem("countsp", countsp);
            showcountsp();
            break;
        }
        
    }
    sessionStorage.setItem("ssgiohang", JSON.stringify(giohang));
    showgiohang();
}

function xoatatca() {
    giohang = [ ];
    var countsp = parseInt(sessionStorage.getItem("countsp") -3);
    sessionStorage.setItem("countsp", countsp);
    showcountsp();
    sessionStorage.setItem("ssgiohang", JSON.stringify(giohang));
    showcart();
}

function dongydathang() {
    var ttnh = document.getElementById("thongtinnhanhang").children;
    var hoten = ttnh[0].children[1].children[0].value;
    var diachi = ttnh[1].children[1].children[0].value;
    var dienthoai = ttnh[2].children[1].children[0].value;
    var email = ttnh[3].children[1].children[0].value;

    var nguoinhan = new Array(hoten,diachi,dienthoai,email);

    sessionStorage.setItem("nguoinhan",JSON.stringify(nguoinhan));

    window.location.assign("donhang.html");
}

function showthongtinkhachhang() {
    var nguoinhan = sessionStorage.getItem("nguoinhan");
    var thongtin = JSON.parse(nguoinhan);

    var tt = `
            <tr>
                <td width="20%">Họ tên</td>
                <td> ${thongtin[0]} </td>
            </tr>
            <tr>
                <td>Địa chỉ</td>
                <td> ${thongtin[1]}</td>
            </tr>
            <tr>
                <td>Điện thoại</td>
                <td> ${thongtin[2]}</td>
            </tr>
            <tr>
                <td>Email</td>
                <td> ${thongtin[3]}</td>
            </tr>
    `;
    document.getElementById("thongtinnhanhang").innerHTML = tt;
}