package com.example.demo.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {
    
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")  // Применить ко всем API эндпоинтам
                .allowedOrigins("http://localhost:5173")  // Разрешить Vite порт
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")  // Разрешенные методы
                .allowedHeaders("*")  // Разрешить все заголовки
                .allowCredentials(true)  // Разрешить куки/авторизацию
                .maxAge(3600);  // Кэшировать CORS настройки на 1 час
    }
}