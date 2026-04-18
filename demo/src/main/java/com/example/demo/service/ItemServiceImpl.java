// service/ItemServiceImpl.java
package com.example.demo.service;

import com.example.demo.entity.Item;
import com.example.demo.repository.ItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ItemServiceImpl implements ItemService {
    
    @Autowired
    private ItemRepository itemRepository;
    
    @Override
    public List<Item> getAllItems() {
        return itemRepository.findAll();
    }
    
    @Override
    public List<Item> getItemsByIndices(List<Integer> indices) {
        List<Item> allItems = itemRepository.findAll();
        return indices.stream()
            .filter(index -> index >= 0 && index < allItems.size())
            .map(allItems::get)
            .collect(Collectors.toList());
    }
    
    @Override
    public Item getItemByIndex(int index) {
        List<Item> allItems = itemRepository.findAll();
        if (index >= 0 && index < allItems.size()) {
            return allItems.get(index);
        }
        throw new IndexOutOfBoundsException("Index: " + index + ", Size: " + allItems.size());
    }

    @Override
    public Item saveItem(Item item) {
        return itemRepository.save(item);
    }

    @Override
    public List<Item> saveAllItems(List<Item> items) {
        return itemRepository.saveAll(items);
    }
}