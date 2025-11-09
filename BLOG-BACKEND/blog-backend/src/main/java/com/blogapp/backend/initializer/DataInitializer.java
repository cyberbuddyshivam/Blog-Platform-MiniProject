package com.blogapp.backend.initializer;

import com.blogapp.backend.entity.Category;
import com.blogapp.backend.entity.User;
import com.blogapp.backend.repository.CategoryRepository;
import com.blogapp.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.List;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        // Initialize Categories if database is empty
        if (categoryRepository.count() == 0) {
            List<Category> categories = Arrays.asList(
                    createCategory("Technology", "Tech related posts and tutorials"),
                    createCategory("Lifestyle", "Lifestyle and personal development"),
                    createCategory("Travel", "Travel experiences and adventure stories"),
                    createCategory("Food", "Recipes, reviews and culinary adventures"),
                    createCategory("Education", "Learning resources and educational content"),
                    createCategory("Entertainment", "Movies, music and pop culture"),
                    createCategory("Sports", "Sports news, analysis and updates"),
                    createCategory("Health", "Health and wellness tips")
            );

            categoryRepository.saveAll(categories);
            System.out.println("✅ Created " + categories.size() + " default categories");
        } else {
            System.out.println("✅ Categories already exist: " + categoryRepository.count() + " found");
        }

        // Initialize default test user if no users exist
        if (userRepository.count() == 0) {
            User testUser = new User();
            testUser.setUsername("john");
            testUser.setEmail("john@example.com");
            testUser.setPassword(passwordEncoder.encode("password123"));
            testUser.setBio("Test user for blog platform");

            userRepository.save(testUser);
            System.out.println("✅ Created default test user: john / password123");
        } else {
            System.out.println("✅ Users already exist: " + userRepository.count() + " found");
        }
    }

    private Category createCategory(String name, String description) {
        Category category = new Category();
        category.setName(name);
        category.setDescription(description);
        return category;
    }
}
