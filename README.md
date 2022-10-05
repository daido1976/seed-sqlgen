```sh
$ deno run -A main.ts
# INSERT INTO `suppliers` (`name`) VALUES ('suppliers_name_1');
# INSERT INTO `teas` (`name`, `category`, `shibumi_rate`, `nigami_rate`, `amami_rate`, `location`, `stock`, `price`, `supplier_id`) VALUES ('teas_name_1', 'teas_category_1', 1, 1, 1, 'teas_location_1', 1, 1, 1);
# INSERT INTO `blend_tea_rates` (`rate`, `tea_id`, `blend_tea_id`) VALUES (0.5, 1, 1);
# ...

$ deno run -A main.ts -in <inputfile> -o <outfile>
```
