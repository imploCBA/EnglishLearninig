// controller/ItemController.java
package com.example.demo.controller;

import com.example.demo.entity.Item;
import com.example.demo.service.ItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/items")
@CrossOrigin(origins = "http://localhost:3000") // Для React на 3000 порту
public class ItemController {
    
    @Autowired
    private ItemService itemService;
    
    // Получить все записи
    @GetMapping
    public ResponseEntity<List<Item>> getAllItems() {
        return ResponseEntity.ok(itemService.getAllItems());
    }
    
    // Получить записи по индексам (POST запрос с массивом индексов)
    @PostMapping("/by-indices")
    public ResponseEntity<List<Item>> getItemsByIndices(@RequestBody Map<String, List<Integer>> request) {
        List<Integer> indices = request.get("indices");
        return ResponseEntity.ok(itemService.getItemsByIndices(indices));
    }
    
    // Получить одну запись по индексу
    @GetMapping("/index/{index}")
    public ResponseEntity<Item> getItemByIndex(@PathVariable int index) {
        return ResponseEntity.ok(itemService.getItemByIndex(index));
    }

    @PostMapping
    public ResponseEntity<Item> createItem(@RequestBody Item item) {
        try {
            Item savedItem = itemService.saveItem(item);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedItem);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PostMapping("/batch")
    public ResponseEntity<List<Item>> createMultipleItems(@RequestBody List<Item> items) {
        List<Item> savedItems = itemService.saveAllItems(items);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedItems);
    }
}

