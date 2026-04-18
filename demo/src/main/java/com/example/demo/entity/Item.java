package com.example.demo.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "sentences")
public class Item {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "sentence", nullable = false, length = 1000)
    private String sentence;
    
    @Column(name = "translate", nullable = false, length = 1000)
    private String translate;
    
    @Column(name = "lesson_number", nullable = false, length = 50)
    private String lessonNumber;
    
    // Конструкторы
    public Item() {}
    
    public Item(String sentence, String translate, String lessonNumber) {
        this.sentence = sentence;
        this.translate = translate;
        this.lessonNumber = lessonNumber;
    }
    
    // Геттеры и сеттеры
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public String getSentence() {
        return sentence;
    }
    
    public void setSentence(String sentence) {
        this.sentence = sentence;
    }
    
    public String getTranslate() {
        return translate;
    }
    
    public void setTranslate(String translate) {
        this.translate = translate;
    }
    
    public String getLessonNumber() {
        return lessonNumber;
    }
    
    public void setLessonNumber(String lessonNumber) {
        this.lessonNumber = lessonNumber;
    }
}