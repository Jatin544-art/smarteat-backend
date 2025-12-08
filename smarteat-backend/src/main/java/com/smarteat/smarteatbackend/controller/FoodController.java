package com.smarteat.smarteatbackend.controller;

import com.smarteat.smarteatbackend.entity.FoodLog;
import com.smarteat.smarteatbackend.repository.FoodLogRepository;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*") // allow frontend later
public class FoodController {

    private final FoodLogRepository foodLogRepository;

    public FoodController(FoodLogRepository foodLogRepository) {
        this.foodLogRepository = foodLogRepository;
    }

    // Simple function to map name → per unit nutrients
    private Map<String, Double[]> getFoodInfo(String foodName) {
        String name = foodName.toLowerCase();
        Map<String, Double[]> map = new HashMap<>();

// values: {calories, protein, fat, carbs} per 1 unit
map.put("chapati",      new Double[]{70.0, 3.0, 1.5, 12.0});
map.put("phulka",       new Double[]{60.0, 2.5, 1.0, 11.0});
map.put("paratha",      new Double[]{180.0, 4.0, 8.0, 22.0});
map.put("aloo paratha", new Double[]{210.0, 4.5, 7.0, 30.0});
map.put("puri",         new Double[]{80.0, 2.0, 4.5, 10.0});

map.put("rice",         new Double[]{130.0, 2.5, 0.3, 28.0});
map.put("brown rice",   new Double[]{110.0, 2.6, 0.9, 23.0});
map.put("biryani",      new Double[]{300.0, 10.0, 8.0, 40.0});
map.put("lemon rice",   new Double[]{250.0, 5.0, 7.0, 38.0});
map.put("curd rice",    new Double[]{200.0, 6.0, 4.0, 32.0});
map.put("fried rice",   new Double[]{240.0, 6.0, 8.0, 34.0});
map.put("jeera rice",   new Double[]{160.0, 3.0, 4.0, 26.0});

map.put("dal",             new Double[]{120.0, 8.0, 3.0, 16.0});
map.put("sambar",          new Double[]{100.0, 4.0, 2.0, 15.0});
map.put("rasam",           new Double[]{40.0, 1.0, 0.5, 8.0});
map.put("chole",           new Double[]{180.0, 9.0, 6.0, 22.0});
map.put("rajma",           new Double[]{210.0, 9.0, 4.0, 30.0});
map.put("kadhi",           new Double[]{160.0, 5.0, 8.0, 18.0});
map.put("dal makhani",     new Double[]{300.0, 10.0, 16.0, 28.0});
map.put("paneer curry",    new Double[]{260.0, 12.0, 18.0, 10.0});
map.put("kadai paneer",    new Double[]{280.0, 13.0, 20.0, 12.0});
map.put("palak paneer",    new Double[]{250.0, 12.0, 18.0, 10.0});
map.put("veg kurma",       new Double[]{180.0, 4.0, 10.0, 15.0});

map.put("egg",            new Double[]{78.0, 6.0, 5.0, 0.6});
map.put("boiled egg",     new Double[]{78.0, 6.0, 5.0, 0.6});
map.put("omelette",       new Double[]{150.0, 8.0, 12.0, 1.0});
map.put("egg curry",      new Double[]{180.0, 9.0, 10.0, 6.0});
map.put("chicken curry",  new Double[]{250.0, 23.0, 12.0, 6.0});
map.put("chicken fry",    new Double[]{280.0, 25.0, 15.0, 5.0});
map.put("grilled chicken",new Double[]{160.0, 30.0, 3.0, 0.0});
map.put("tandoori chicken",new Double[]{260.0, 28.0, 12.0, 5.0});
map.put("fish curry",     new Double[]{200.0, 22.0, 10.0, 4.0});
map.put("grilled fish",   new Double[]{120.0, 20.0, 4.0, 0.0});
map.put("mutton curry",   new Double[]{320.0, 20.0, 22.0, 6.0});
map.put("paneer",         new Double[]{260.0, 18.0, 20.0, 5.0});
map.put("tofu",           new Double[]{90.0, 10.0, 5.0, 2.0});

map.put("poha",           new Double[]{180.0, 4.0, 4.0, 30.0});
map.put("upma",           new Double[]{220.0, 5.0, 8.0, 32.0});
map.put("idli",           new Double[]{55.0, 2.0, 0.4, 12.0});
map.put("dosa",           new Double[]{168.0, 3.0, 6.0, 25.0});
map.put("masala dosa",    new Double[]{380.0, 6.0, 12.0, 55.0});
map.put("uttapam",        new Double[]{200.0, 4.0, 6.0, 30.0});
map.put("vada",           new Double[]{110.0, 2.0, 7.0, 12.0});
map.put("pongal",         new Double[]{250.0, 6.0, 10.0, 32.0});
map.put("idiyappam",      new Double[]{160.0, 3.0, 1.0, 35.0});
map.put("chapati roll",   new Double[]{150.0, 4.0, 4.0, 22.0});

map.put("samosa",         new Double[]{130.0, 3.0, 7.0, 16.0});
map.put("pakoda",         new Double[]{80.0, 2.0, 5.0, 6.0});
map.put("pani puri",      new Double[]{35.0, 0.5, 1.0, 6.0});
map.put("bhel puri",      new Double[]{150.0, 3.0, 4.0, 24.0});
map.put("vada pav",       new Double[]{290.0, 6.0, 14.0, 34.0});
map.put("dabeli",         new Double[]{300.0, 7.0, 12.0, 40.0});
map.put("pav bhaji",      new Double[]{400.0, 10.0, 15.0, 55.0});
map.put("momos",          new Double[]{35.0, 1.5, 1.0, 4.0});
map.put("chana chaat",    new Double[]{180.0, 9.0, 3.0, 26.0});
map.put("maggi",          new Double[]{350.0, 7.0, 13.0, 50.0});

map.put("banana",        new Double[]{89.0, 1.1, 0.3, 22.0});
map.put("apple",         new Double[]{95.0, 0.5, 0.3, 25.0});
map.put("orange",        new Double[]{62.0, 1.2, 0.2, 15.0});
map.put("mango",         new Double[]{99.0, 1.4, 0.6, 25.0});
map.put("grapes",        new Double[]{69.0, 0.6, 0.2, 18.0});
map.put("papaya",        new Double[]{43.0, 0.5, 0.3, 11.0});
map.put("watermelon",    new Double[]{30.0, 0.6, 0.2, 8.0});

map.put("milk",          new Double[]{150.0, 8.0, 8.0, 12.0});
map.put("buttermilk",    new Double[]{35.0, 3.0, 0.5, 5.0});
map.put("lassi",         new Double[]{250.0, 8.0, 6.0, 38.0});
map.put("tea",           new Double[]{50.0, 1.0, 2.0, 7.0});
map.put("coffee",        new Double[]{60.0, 1.0, 2.0, 9.0});
map.put("coconut water", new Double[]{45.0, 0.5, 0.2, 11.0});
map.put("sugarcane juice",new Double[]{250.0, 0.5, 0.1, 65.0});

map.put("curd",          new Double[]{98.0, 11.0, 4.0, 3.0});
map.put("paneer tikka",  new Double[]{300.0, 20.0, 18.0, 10.0});
map.put("veg pulao",     new Double[]{250.0, 5.0, 9.0, 35.0});
map.put("khichdi",       new Double[]{180.0, 6.0, 3.0, 28.0});
map.put("aloo sabzi",    new Double[]{160.0, 3.0, 6.0, 22.0});
map.put("bhindi fry",    new Double[]{130.0, 2.0, 8.0, 12.0});
map.put("gobi sabzi",    new Double[]{120.0, 3.0, 7.0, 10.0});
map.put("paneer bhurji", new Double[]{280.0, 16.0, 20.0, 8.0});
map.put("egg fried rice",new Double[]{280.0, 9.0, 10.0, 36.0});
map.put("veg fried rice",new Double[]{240.0, 5.0, 8.0, 35.0});
map.put("chicken biryani",new Double[]{330.0, 18.0, 10.0, 42.0});
map.put("mutton biryani", new Double[]{380.0, 20.0, 14.0, 45.0});


        for (String key : map.keySet()) {
            if (name.contains(key)) {
                return Map.of(key, map.get(key));
            }
        }

        return null;
    }

    @PostMapping("/log")
    @GetMapping("/log")
    public Map<String, Object> addFood(
            @RequestParam String foodName,
            @RequestParam double quantity
    ) {
        Map<String, Double[]> foodInfoMap = getFoodInfo(foodName);

        if (foodInfoMap == null) {
            Map<String, Object> error = new HashMap<>();
            error.put("success", false);
            error.put("message", "Unknown food: " + foodName);
            return error;
        }

        Double[] vals = foodInfoMap.values().iterator().next();
        double calPerUnit = vals[0];
        double proteinPerUnit = vals[1];
        double fatPerUnit = vals[2];
        double carbsPerUnit = vals[3];

        double totalCalories = calPerUnit * quantity;
        double totalProtein = proteinPerUnit * quantity;
        double totalFat = fatPerUnit * quantity;
        double totalCarbs = carbsPerUnit * quantity;

        FoodLog log = new FoodLog(
                foodName,
                quantity,
                totalCalories,
                totalProtein,
                totalFat,
                totalCarbs,
                LocalDate.now()
        );

        foodLogRepository.save(log);

        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("foodName", foodName);
        response.put("quantity", quantity);
        response.put("calories", totalCalories);
        response.put("protein", totalProtein);
        response.put("fat", totalFat);
        response.put("carbs", totalCarbs);

        return response;
    }

    @GetMapping("/summary/today")
    public Map<String, Object> getTodaySummary() {
        LocalDate today = LocalDate.now();
        List<FoodLog> logs = foodLogRepository.findByDate(today);

        double totalCalories = 0, totalProtein = 0, totalFat = 0, totalCarbs = 0;

        for (FoodLog log : logs) {
            totalCalories += log.getCalories();
            totalProtein += log.getProtein();
            totalFat += log.getFat();
            totalCarbs += log.getCarbs();
        }

        String suggestion = getSuggestion(totalCalories, totalProtein, totalFat);

        Map<String, Object> summary = new HashMap<>();
        summary.put("date", today.toString());
        summary.put("totalCalories", totalCalories);
        summary.put("totalProtein", totalProtein);
        summary.put("totalFat", totalFat);
        summary.put("totalCarbs", totalCarbs);
        summary.put("entriesCount", logs.size());
        summary.put("suggestion", suggestion);

        return summary;
    }

    @GetMapping("/summary/month")
    public Map<String, Object> getMonthSummary(
            @RequestParam int year,
            @RequestParam int month
    ) {
        // month is 1–12
        LocalDate start = LocalDate.of(year, month, 1);
        LocalDate end = start.withDayOfMonth(start.lengthOfMonth());

        List<FoodLog> logs = foodLogRepository.findByDateBetween(start, end);

        double totalCalories = 0, totalProtein = 0, totalFat = 0, totalCarbs = 0;

        for (FoodLog log : logs) {
            totalCalories += log.getCalories();
            totalProtein += log.getProtein();
            totalFat += log.getFat();
            totalCarbs += log.getCarbs();
        }

        int daysInMonth = start.lengthOfMonth();
        double avgCalories = totalCalories / daysInMonth;
        double avgProtein = totalProtein / daysInMonth;
        double avgFat = totalFat / daysInMonth;
        double avgCarbs = totalCarbs / daysInMonth;

        String suggestion = getSuggestion(avgCalories, avgProtein, avgFat);

        Map<String, Object> summary = new HashMap<>();
        summary.put("year", year);
        summary.put("month", month);
        summary.put("totalCalories", totalCalories);
        summary.put("totalProtein", totalProtein);
        summary.put("totalFat", totalFat);
        summary.put("totalCarbs", totalCarbs);
        summary.put("averageCaloriesPerDay", avgCalories);
        summary.put("averageProteinPerDay", avgProtein);
        summary.put("averageFatPerDay", avgFat);
        summary.put("averageCarbsPerDay", avgCarbs);
        summary.put("suggestion", suggestion);
        summary.put("entriesCount", logs.size());

        return summary;
    }

    // Simple suggestion engine based on totals
    private String getSuggestion(double calories, double protein, double fat) {
        StringBuilder sb = new StringBuilder();

        // target example values
        double targetCalories = 2000;
        double targetProtein = 60;
        double targetFat = 70;

        if (protein < targetProtein * 0.7) {
            sb.append("Protein seems low today. Try adding eggs, paneer, or dal. ");
        } else if (protein > targetProtein * 1.3) {
            sb.append("Protein is quite high today. Make sure you balance it with enough carbs and veggies. ");
        }

        if (calories < targetCalories * 0.8) {
            sb.append("Your calorie intake is on the lower side. Don't skip meals. ");
        } else if (calories > targetCalories * 1.2) {
            sb.append("Calories are high. Reduce fried foods and sugar drinks. ");
        }

        if (fat > targetFat) {
            sb.append("Fat intake is high. Prefer grilled/boiled food instead of deep fried. ");
        }

        if (sb.length() == 0) {
            sb.append("Your intake looks fairly balanced today. Keep it up! ");
        }

        return sb.toString();
    }
}
