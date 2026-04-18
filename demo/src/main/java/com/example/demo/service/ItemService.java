// service/ItemService.java
package com.example.demo.service;

import com.example.demo.entity.Item;
import java.util.List;

public interface ItemService {
    List<Item> getAllItems();
    List<Item> getItemsByIndices(List<Integer> indices);
    Item getItemByIndex(int index);
    Item saveItem(Item item);
    List<Item> saveAllItems(List<Item> items);
}