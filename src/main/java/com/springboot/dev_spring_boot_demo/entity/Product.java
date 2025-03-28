package com.springboot.dev_spring_boot_demo.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "product") // Đổi tên bảng thành "product"
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "ten_san_pham")
    private String tenSanPham;

    @Column(name = "mo_ta")
    private String moTa;

    @Column(name = "gia")
    private BigDecimal gia;

    @Column(name = "so_luong")
    private int soLuong;

    @Column(name = "ngay_tao")
    private LocalDateTime ngayTao;

    public Product() {}

    public Product(String tenSanPham, String moTa, BigDecimal gia, int soLuong) {
        this.tenSanPham = tenSanPham;
        this.moTa = moTa;
        this.gia = gia;
        this.soLuong = soLuong;
        this.ngayTao = LocalDateTime.now();
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTenSanPham() {
        return tenSanPham;
    }

    public void setTenSanPham(String tenSanPham) {
        this.tenSanPham = tenSanPham;
    }

    public String getMoTa() {
        return moTa;
    }

    public void setMoTa(String moTa) {
        this.moTa = moTa;
    }

    public BigDecimal getGia() {
        return gia;
    }

    public void setGia(BigDecimal gia) {
        this.gia = gia;
    }

    public int getSoLuong() {
        return soLuong;
    }

    public void setSoLuong(int soLuong) {
        this.soLuong = soLuong;
    }

    public LocalDateTime getNgayTao() {
        return ngayTao;
    }

    public void setNgayTao(LocalDateTime ngayTao) {
        this.ngayTao = ngayTao;
    }

    @Override
    public String toString() {
        return "Product{" +
                "id=" + id +
                ", tenSanPham='" + tenSanPham + '\'' +
                ", moTa='" + moTa + '\'' +
                ", gia=" + gia +
                ", soLuong=" + soLuong +
                ", ngayTao=" + ngayTao +
                '}';
    }
}
