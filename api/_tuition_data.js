/**
 * The Abba's Orchard School - Official SY 2026-2027 Annual Tuition Fees Dataset & Calculator
 * Sourced directly from internal Accounting Summary: SY26-27 Tuition Fees Summary_Annual.xlsx
 */

const TUITION_SCHEDULE_SY26_27 = {
  "LGE/ALW": {
    "name": "Cagayan de Oro (Alwana) & Bukidnon (La Granja)",
    "rates": [
      {
        "level": "Infant Community/ Pre-casa",
        "age": "Toddler (14 mos - 2 yrs)",
        "whole": 123300.47,
        "dp15": 18495.07,
        "annualBal": 104805.4,
        "semiBal": 56594.92,
        "qtrBal": 28821.49,
        "moBal": 11738.2,
        "hasMemoryBook": false,
        "hasFarm": false
      },
      {
        "level": "Casa 1 & 2  (half-day)",
        "age": "Ages 3 - 4 yrs",
        "whole": 125275.85,
        "dp15": 18791.38,
        "annualBal": 106484.47,
        "semiBal": 57501.61,
        "qtrBal": 29283.23,
        "moBal": 11926.26,
        "hasMemoryBook": false,
        "hasFarm": false
      },
      {
        "level": "Casa 3 (whole-day)",
        "age": "Age 5 yrs (Kinder)",
        "whole": 136319.56,
        "dp15": 20447.93,
        "annualBal": 115871.62,
        "semiBal": 62570.68,
        "qtrBal": 31864.7,
        "moBal": 12977.62,
        "hasMemoryBook": true,
        "hasFarm": false
      },
      {
        "level": "Level 1 (Gr 1-3)",
        "age": "Ages 6 - 8 yrs (Grades 1-3)",
        "whole": 136686.12,
        "dp15": 20502.92,
        "annualBal": 116183.2,
        "semiBal": 62738.93,
        "qtrBal": 31950.38,
        "moBal": 13012.52,
        "hasMemoryBook": false,
        "hasFarm": false
      },
      {
        "level": "Level 2 (Gr 4-5)",
        "age": "Ages 9 - 10 yrs (Grades 4-5)",
        "whole": 145469.19,
        "dp15": 21820.38,
        "annualBal": 123648.82,
        "semiBal": 66770.36,
        "qtrBal": 34003.42,
        "moBal": 13848.67,
        "hasMemoryBook": false,
        "hasFarm": false
      },
      {
        "level": "Level 2 (Gr 6)",
        "age": "Age 11 yrs (Grade 6)",
        "whole": 148653.66,
        "dp15": 22298.05,
        "annualBal": 126355.61,
        "semiBal": 68232.03,
        "qtrBal": 34747.79,
        "moBal": 14151.83,
        "hasMemoryBook": true,
        "hasFarm": false
      },
      {
        "level": "Level 3 (Gr 7-9)",
        "age": "Ages 12 - 14 yrs (Grades 7-9)",
        "whole": 150883.46,
        "dp15": 22632.52,
        "annualBal": 128250.94,
        "semiBal": 69255.51,
        "qtrBal": 35269.01,
        "moBal": 14364.11,
        "hasMemoryBook": false,
        "hasFarm": true
      },
      {
        "level": "Level 4 (Gr 10-11)",
        "age": "Ages 15 - 16 yrs (Grades 10-11)",
        "whole": 152392.3,
        "dp15": 22858.84,
        "annualBal": 129533.45,
        "semiBal": 69948.06,
        "qtrBal": 35621.7,
        "moBal": 14507.75,
        "hasMemoryBook": false,
        "hasFarm": true
      },
      {
        "level": "Level 4 (Gr 12)",
        "age": "Age 17 yrs (Grade 12)",
        "whole": 155576.75,
        "dp15": 23336.51,
        "annualBal": 132240.23,
        "semiBal": 71409.73,
        "qtrBal": 36366.06,
        "moBal": 14810.91,
        "hasMemoryBook": true,
        "hasFarm": true
      }
    ]
  },
  "DVO": {
    "name": "Davao City (Obrero & Mandug)",
    "rates": [
      {
        "level": "Infant Community/ Pre-casa",
        "age": "Toddler (14 mos - 2 yrs)",
        "whole": 136860.612,
        "dp15": 20529.0918,
        "annualBal": 116331.5202,
        "semiBal": 62819.020908000006,
        "qtrBal": 31991.168055000002,
        "moBal": 13029.1302624,
        "hasMemoryBook": false,
        "hasFarm": false
      },
      {
        "level": "Casa 1 & 2  (half-day)",
        "age": "Ages 3 - 4 yrs",
        "whole": 144268.698,
        "dp15": 21640.3047,
        "annualBal": 122628.3933,
        "semiBal": 66219.33238200001,
        "qtrBal": 33722.8081575,
        "moBal": 13734.3800496,
        "hasMemoryBook": false,
        "hasFarm": false
      },
      {
        "level": "Casa 3 (whole-day)",
        "age": "Age 5 yrs (Kinder)",
        "whole": 155861.433,
        "dp15": 23379.214949999998,
        "annualBal": 132482.21805,
        "semiBal": 71540.397747,
        "qtrBal": 36432.60996375,
        "moBal": 14838.008421600001,
        "hasMemoryBook": true,
        "hasFarm": false
      },
      {
        "level": "Level 1 (Gr 1-3)",
        "age": "Ages 6 - 8 yrs (Grades 1-3)",
        "whole": 156683.6355,
        "dp15": 23502.545325,
        "annualBal": 133181.09017500002,
        "semiBal": 71917.78869450002,
        "qtrBal": 36624.79979812501,
        "moBal": 14916.282099600005,
        "hasMemoryBook": false,
        "hasFarm": false
      },
      {
        "level": "Level 2 (Gr 4-5)",
        "age": "Ages 9 - 10 yrs (Grades 4-5)",
        "whole": 166431.657,
        "dp15": 24964.74855,
        "annualBal": 141466.90845000002,
        "semiBal": 76392.13056300001,
        "qtrBal": 38903.399823750005,
        "moBal": 15844.293746400002,
        "hasMemoryBook": false,
        "hasFarm": false
      },
      {
        "level": "Level 2 (Gr 6)",
        "age": "Age 11 yrs (Grade 6)",
        "whole": 169554.87149999998,
        "dp15": 25433.230724999998,
        "annualBal": 144121.64077499998,
        "semiBal": 77825.6860185,
        "qtrBal": 39633.451213124994,
        "moBal": 16141.6237668,
        "hasMemoryBook": true,
        "hasFarm": false
      },
      {
        "level": "Level 3 (Gr 7-9)",
        "age": "Ages 12 - 14 yrs (Grades 7-9)",
        "whole": 172098.192,
        "dp15": 25814.7288,
        "annualBal": 146283.4632,
        "semiBal": 78993.070128,
        "qtrBal": 40227.95238,
        "moBal": 16383.747878400001,
        "hasMemoryBook": false,
        "hasFarm": true
      },
      {
        "level": "Level 4 (Gr 10-11)",
        "age": "Ages 15 - 16 yrs (Grades 10-11)",
        "whole": 173819.1735,
        "dp15": 26072.876025,
        "annualBal": 147746.297475,
        "semiBal": 79783.0006365,
        "qtrBal": 40630.231805625,
        "moBal": 16547.585317200002,
        "hasMemoryBook": false,
        "hasFarm": true
      },
      {
        "level": "Level 4 (Gr 12)",
        "age": "Age 17 yrs (Grade 12)",
        "whole": 177003.624,
        "dp15": 26550.5436,
        "annualBal": 150453.0804,
        "semiBal": 81244.66341600001,
        "qtrBal": 41374.59711,
        "moBal": 16850.745004800003,
        "hasMemoryBook": true,
        "hasFarm": true
      }
    ]
  },
  "CBU": {
    "name": "Cebu City (Magsaysay & Tandang Sora)",
    "rates": [
      {
        "level": "Infant Community/ Pre-casa",
        "age": "Toddler (14 mos - 2 yrs)",
        "whole": 134294.45,
        "dp15": 20144.17,
        "annualBal": 114150.29,
        "semiBal": 61641.15,
        "qtrBal": 31391.33,
        "moBal": 12784.83,
        "hasMemoryBook": false,
        "hasFarm": false
      },
      {
        "level": "Casa 1 & 2  (half-day)",
        "age": "Ages 3 - 4 yrs",
        "whole": 141434.63,
        "dp15": 21215.19,
        "annualBal": 120219.44,
        "semiBal": 64918.5,
        "qtrBal": 33060.35,
        "moBal": 13464.58,
        "hasMemoryBook": false,
        "hasFarm": false
      },
      {
        "level": "Casa 3 (whole-day)",
        "age": "Age 5 yrs (Kinder)",
        "whole": 152782.23,
        "dp15": 22917.34,
        "annualBal": 129864.9,
        "semiBal": 70127.05,
        "qtrBal": 35712.85,
        "moBal": 14544.87,
        "hasMemoryBook": true,
        "hasFarm": false
      },
      {
        "level": "Level 1 (Gr 1-3)",
        "age": "Ages 6 - 8 yrs (Grades 1-3)",
        "whole": 153400.59,
        "dp15": 23010.09,
        "annualBal": 130390.5,
        "semiBal": 70410.87,
        "qtrBal": 35857.39,
        "moBal": 14603.74,
        "hasMemoryBook": false,
        "hasFarm": false
      },
      {
        "level": "Level 2 (Gr 4-5)",
        "age": "Ages 9 - 10 yrs (Grades 4-5)",
        "whole": 162796.08,
        "dp15": 24419.41,
        "annualBal": 138376.67,
        "semiBal": 74723.4,
        "qtrBal": 38053.58,
        "moBal": 15498.19,
        "hasMemoryBook": false,
        "hasFarm": false
      },
      {
        "level": "Level 2 (Gr 6)",
        "age": "Age 11 yrs (Grade 6)",
        "whole": 165980.54,
        "dp15": 24897.08,
        "annualBal": 141083.45,
        "semiBal": 76185.07,
        "qtrBal": 38797.95,
        "moBal": 15801.35,
        "hasMemoryBook": true,
        "hasFarm": false
      },
      {
        "level": "Level 3 (Gr 7-9)",
        "age": "Ages 12 - 14 yrs (Grades 7-9)",
        "whole": 168470.24,
        "dp15": 25270.54,
        "annualBal": 143199.71,
        "semiBal": 77327.84,
        "qtrBal": 39379.92,
        "moBal": 16038.37,
        "hasMemoryBook": false,
        "hasFarm": true
      },
      {
        "level": "Level 4 (Gr 10-11)",
        "age": "Ages 15 - 16 yrs (Grades 10-11)",
        "whole": 170154.95,
        "dp15": 25523.24,
        "annualBal": 144631.7,
        "semiBal": 78101.12,
        "qtrBal": 39773.72,
        "moBal": 16198.75,
        "hasMemoryBook": false,
        "hasFarm": true
      },
      {
        "level": "Level 4 (Gr 12)",
        "age": "Age 17 yrs (Grade 12)",
        "whole": 173339.4,
        "dp15": 26000.91,
        "annualBal": 147338.49,
        "semiBal": 79562.78,
        "qtrBal": 40518.08,
        "moBal": 16501.91,
        "hasMemoryBook": true,
        "hasFarm": true
      }
    ]
  },
  "BQC": {
    "name": "Quezon City (Bridgetowne / Calle Industria)",
    "rates": [
      {
        "level": "Infant Community/ Pre-casa",
        "age": "Toddler (14 mos - 2 yrs)",
        "whole": 158927.29,
        "dp15": 23839.09,
        "annualBal": 135088.19,
        "semiBal": 72947.62,
        "qtrBal": 37149.25,
        "moBal": 15129.88,
        "hasMemoryBook": false,
        "hasFarm": false
      },
      {
        "level": "Casa 1 & 2  (half-day)",
        "age": "Ages 3 - 4 yrs",
        "whole": 180818.87,
        "dp15": 27122.83,
        "annualBal": 153696.04,
        "semiBal": 82995.86,
        "qtrBal": 42266.41,
        "moBal": 17213.96,
        "hasMemoryBook": false,
        "hasFarm": false
      },
      {
        "level": "Casa 3 (whole-day)",
        "age": "Age 5 yrs (Kinder)",
        "whole": 205893.65,
        "dp15": 30884.05,
        "annualBal": 175009.6,
        "semiBal": 94505.19,
        "qtrBal": 48127.64,
        "moBal": 19601.08,
        "hasMemoryBook": true,
        "hasFarm": false
      },
      {
        "level": "Level 1 (Gr 1-3)",
        "age": "Ages 6 - 8 yrs (Grades 1-3)",
        "whole": 213656.27,
        "dp15": 32048.44,
        "annualBal": 181607.83,
        "semiBal": 98068.23,
        "qtrBal": 49942.15,
        "moBal": 20340.08,
        "hasMemoryBook": false,
        "hasFarm": false
      },
      {
        "level": "Level 2 (Gr 4-5)",
        "age": "Ages 9 - 10 yrs (Grades 4-5)",
        "whole": 218631.63,
        "dp15": 32794.74,
        "annualBal": 185836.89,
        "semiBal": 100351.92,
        "qtrBal": 51105.14,
        "moBal": 20813.73,
        "hasMemoryBook": false,
        "hasFarm": false
      },
      {
        "level": "Level 2 (Gr 6)",
        "age": "Age 11 yrs (Grade 6)",
        "whole": 221816.08,
        "dp15": 33272.41,
        "annualBal": 188543.67,
        "semiBal": 101813.58,
        "qtrBal": 51849.51,
        "moBal": 21116.89,
        "hasMemoryBook": true,
        "hasFarm": false
      },
      {
        "level": "Level 3 (Gr 7-9)",
        "age": "Ages 12 - 14 yrs (Grades 7-9)",
        "whole": 229563.21,
        "dp15": 34434.48,
        "annualBal": 195128.73,
        "semiBal": 105369.51,
        "qtrBal": 53660.4,
        "moBal": 21854.42,
        "hasMemoryBook": false,
        "hasFarm": true
      },
      {
        "level": "Level 4 (Gr 10-11)",
        "age": "Ages 15 - 16 yrs (Grades 10-11)",
        "whole": 234154.47,
        "dp15": 35123.17,
        "annualBal": 199031.3,
        "semiBal": 107476.9,
        "qtrBal": 54733.61,
        "moBal": 22291.51,
        "hasMemoryBook": false,
        "hasFarm": true
      }
    ]
  },
  "MCK / BYN": {
    "name": "Taguig City (BGC McKinley Hill & Bayani Road)",
    "rates": [
      {
        "level": "Infant Community/ Pre-casa",
        "age": "Toddler (14 mos - 2 yrs)",
        "whole": 198563.21,
        "dp15": 29784.48,
        "annualBal": 168778.73,
        "semiBal": 91140.51,
        "qtrBal": 46414.15,
        "moBal": 18903.22,
        "hasMemoryBook": false,
        "hasFarm": false
      },
      {
        "level": "Casa 1 & 2  (half-day)",
        "age": "Ages 3 - 4 yrs",
        "whole": 225640.0,
        "dp15": 33846.0,
        "annualBal": 191794.0,
        "semiBal": 103568.76,
        "qtrBal": 52743.35,
        "moBal": 21480.93,
        "hasMemoryBook": false,
        "hasFarm": false
      },
      {
        "level": "Casa 3 (whole-day)",
        "age": "Age 5 yrs (Kinder)",
        "whole": 246874.38,
        "dp15": 37031.16,
        "annualBal": 209843.23,
        "semiBal": 113315.34,
        "qtrBal": 57706.89,
        "moBal": 23502.44,
        "hasMemoryBook": true,
        "hasFarm": false
      },
      {
        "level": "Level 1 (Gr 1-3)",
        "age": "Ages 6 - 8 yrs (Grades 1-3)",
        "whole": 261742.4,
        "dp15": 39261.36,
        "annualBal": 222481.04,
        "semiBal": 120139.76,
        "qtrBal": 61182.29,
        "moBal": 24917.88,
        "hasMemoryBook": false,
        "hasFarm": false
      },
      {
        "level": "Level 2 (Gr 4-5)",
        "age": "Ages 9 - 10 yrs (Grades 4-5)",
        "whole": 279793.61,
        "dp15": 41969.04,
        "annualBal": 237824.56,
        "semiBal": 128425.26,
        "qtrBal": 65401.76,
        "moBal": 26636.35,
        "hasMemoryBook": false,
        "hasFarm": false
      },
      {
        "level": "Level 2 (Gr 6)",
        "age": "Age 11 yrs (Grade 6)",
        "whole": 282978.07,
        "dp15": 42446.71,
        "annualBal": 240531.36,
        "semiBal": 129886.93,
        "qtrBal": 66146.12,
        "moBal": 26939.51,
        "hasMemoryBook": true,
        "hasFarm": false
      }
    ]
  },
  "ALB": {
    "name": "Muntinlupa (Alabang Filinvest City)",
    "rates": [
      {
        "level": "Infant Community/ Pre-casa",
        "age": "Toddler (14 mos - 2 yrs)",
        "whole": 189274.72,
        "dp15": 28391.21,
        "annualBal": 160883.51,
        "semiBal": 86877.1,
        "qtrBal": 44242.97,
        "moBal": 18018.95,
        "hasMemoryBook": false,
        "hasFarm": false
      },
      {
        "level": "Casa 1 & 2  (half-day)",
        "age": "Ages 3 - 4 yrs",
        "whole": 215084.91,
        "dp15": 32262.74,
        "annualBal": 182822.17,
        "semiBal": 98723.97,
        "qtrBal": 50276.1,
        "moBal": 20476.08,
        "hasMemoryBook": false,
        "hasFarm": false
      },
      {
        "level": "Casa 3 (whole-day)",
        "age": "Age 5 yrs (Kinder)",
        "whole": 226871.49,
        "dp15": 34030.72,
        "annualBal": 192840.77,
        "semiBal": 104134.02,
        "qtrBal": 53031.21,
        "moBal": 21598.17,
        "hasMemoryBook": true,
        "hasFarm": false
      },
      {
        "level": "Level 1 (Gr 1-3)",
        "age": "Ages 6 - 8 yrs (Grades 1-3)",
        "whole": 232291.71,
        "dp15": 34843.76,
        "annualBal": 197447.95,
        "semiBal": 106621.89,
        "qtrBal": 54298.19,
        "moBal": 22114.17,
        "hasMemoryBook": false,
        "hasFarm": false
      },
      {
        "level": "Level 2 (Gr 4-5)",
        "age": "Ages 9 - 10 yrs (Grades 4-5)",
        "whole": 240895.11,
        "dp15": 36134.27,
        "annualBal": 204760.84,
        "semiBal": 110570.85,
        "qtrBal": 56309.23,
        "moBal": 22933.21,
        "hasMemoryBook": false,
        "hasFarm": false
      },
      {
        "level": "Level 2 (Gr 6)",
        "age": "Age 11 yrs (Grade 6)",
        "whole": 244079.56,
        "dp15": 36611.93,
        "annualBal": 207467.62,
        "semiBal": 112032.52,
        "qtrBal": 57053.6,
        "moBal": 23236.37,
        "hasMemoryBook": true,
        "hasFarm": false
      }
    ]
  },
  "ANT": {
    "name": "Antipolo City (Taktak Road)",
    "rates": [
      {
        "level": "Infant Community/ Pre-casa",
        "age": "Toddler (14 mos - 2 yrs)",
        "whole": 149931.4,
        "dp15": 22489.71,
        "annualBal": 127441.69,
        "semiBal": 68818.51,
        "qtrBal": 35046.46,
        "moBal": 14273.47,
        "hasMemoryBook": false,
        "hasFarm": false
      },
      {
        "level": "Casa 1 & 2  (half-day)",
        "age": "Ages 3 - 4 yrs",
        "whole": 180818.87,
        "dp15": 27122.83,
        "annualBal": 153696.04,
        "semiBal": 82995.86,
        "qtrBal": 42266.41,
        "moBal": 17213.96,
        "hasMemoryBook": false,
        "hasFarm": false
      },
      {
        "level": "Casa 3 (whole-day)",
        "age": "Age 5 yrs (Kinder)",
        "whole": 205893.65,
        "dp15": 30884.05,
        "annualBal": 175009.6,
        "semiBal": 94505.19,
        "qtrBal": 48127.64,
        "moBal": 19601.08,
        "hasMemoryBook": true,
        "hasFarm": false
      },
      {
        "level": "Level 1 (Gr 1-3)",
        "age": "Ages 6 - 8 yrs (Grades 1-3)",
        "whole": 213656.27,
        "dp15": 32048.44,
        "annualBal": 181607.83,
        "semiBal": 98068.23,
        "qtrBal": 49942.15,
        "moBal": 20340.08,
        "hasMemoryBook": false,
        "hasFarm": false
      },
      {
        "level": "Level 2 (Gr 4-5)",
        "age": "Ages 9 - 10 yrs (Grades 4-5)",
        "whole": 218631.63,
        "dp15": 32794.74,
        "annualBal": 185836.89,
        "semiBal": 100351.92,
        "qtrBal": 51105.14,
        "moBal": 20813.73,
        "hasMemoryBook": false,
        "hasFarm": false
      },
      {
        "level": "Level 2 (Gr 6)",
        "age": "Age 11 yrs (Grade 6)",
        "whole": 221814.81,
        "dp15": 33272.22,
        "annualBal": 188542.59,
        "semiBal": 101813.0,
        "qtrBal": 51849.21,
        "moBal": 21116.77,
        "hasMemoryBook": true,
        "hasFarm": false
      },
      {
        "level": "Level 3 (Gr 7-9)",
        "age": "Ages 12 - 14 yrs (Grades 7-9)",
        "whole": 229563.21,
        "dp15": 34434.48,
        "annualBal": 195128.73,
        "semiBal": 105369.51,
        "qtrBal": 53660.4,
        "moBal": 21854.42,
        "hasMemoryBook": false,
        "hasFarm": true
      },
      {
        "level": "Level 4 (Gr 10-11)",
        "age": "Ages 15 - 16 yrs (Grades 10-11)",
        "whole": 234154.47,
        "dp15": 35123.17,
        "annualBal": 199031.3,
        "semiBal": 107476.9,
        "qtrBal": 54733.61,
        "moBal": 22291.51,
        "hasMemoryBook": false,
        "hasFarm": true
      },
      {
        "level": "Level 4 (Gr 12)",
        "age": "Age 17 yrs (Grade 12)",
        "whole": 237338.92,
        "dp15": 35600.84,
        "annualBal": 201738.08,
        "semiBal": 108938.57,
        "qtrBal": 55477.97,
        "moBal": 22594.67,
        "hasMemoryBook": true,
        "hasFarm": true
      }
    ]
  },
  "STR": {
    "name": "Canlubang Laguna (Carmelray / Sta. Rosa)",
    "rates": [
      {
        "level": "Infant Community/ Pre-casa",
        "age": "Toddler (14 mos - 2 yrs)",
        "whole": 155975.77,
        "dp15": 23396.37,
        "annualBal": 132579.4,
        "semiBal": 71592.88,
        "qtrBal": 36459.34,
        "moBal": 14848.89,
        "hasMemoryBook": false,
        "hasFarm": false
      },
      {
        "level": "Casa 1 & 2  (half-day)",
        "age": "Ages 3 - 4 yrs",
        "whole": 177245.19,
        "dp15": 26586.78,
        "annualBal": 150658.41,
        "semiBal": 81355.54,
        "qtrBal": 41431.06,
        "moBal": 16873.74,
        "hasMemoryBook": false,
        "hasFarm": false
      },
      {
        "level": "Casa 3 (whole-day)",
        "age": "Age 5 yrs (Kinder)",
        "whole": 187518.18,
        "dp15": 28127.73,
        "annualBal": 159390.45,
        "semiBal": 86070.84,
        "qtrBal": 43832.37,
        "moBal": 17851.73,
        "hasMemoryBook": true,
        "hasFarm": false
      },
      {
        "level": "Level 1 (Gr 1-3)",
        "age": "Ages 6 - 8 yrs (Grades 1-3)",
        "whole": 191424.81,
        "dp15": 28713.72,
        "annualBal": 162711.09,
        "semiBal": 87863.99,
        "qtrBal": 44745.55,
        "moBal": 18223.64,
        "hasMemoryBook": false,
        "hasFarm": false
      },
      {
        "level": "Level 2 (Gr 4-5)",
        "age": "Ages 9 - 10 yrs (Grades 4-5)",
        "whole": 198514.62,
        "dp15": 29777.19,
        "annualBal": 168737.42,
        "semiBal": 91118.21,
        "qtrBal": 46402.79,
        "moBal": 18898.59,
        "hasMemoryBook": false,
        "hasFarm": false
      },
      {
        "level": "Level 2 (Gr 6)",
        "age": "Age 11 yrs (Grade 6)",
        "whole": 201699.07,
        "dp15": 30254.86,
        "annualBal": 171444.21,
        "semiBal": 92579.87,
        "qtrBal": 47147.16,
        "moBal": 19201.75,
        "hasMemoryBook": true,
        "hasFarm": false
      }
    ]
  },
  "GRH": {
    "name": "Mandaluyong (Greenhills)",
    "rates": [
      {
        "level": "Infant Community/ Pre-casa",
        "age": "Toddler (14 mos - 2 yrs)",
        "whole": 178809.07,
        "dp15": 26821.36,
        "annualBal": 151987.71,
        "semiBal": 82073.36,
        "qtrBal": 41796.62,
        "moBal": 17022.62,
        "hasMemoryBook": false,
        "hasFarm": false
      },
      {
        "level": "Casa 1 & 2  (half-day)",
        "age": "Ages 3 - 4 yrs",
        "whole": 203192.12,
        "dp15": 30478.82,
        "annualBal": 172713.3,
        "semiBal": 93265.18,
        "qtrBal": 47496.16,
        "moBal": 19343.89,
        "hasMemoryBook": false,
        "hasFarm": false
      },
      {
        "level": "Casa 3 (whole-day)",
        "age": "Age 5 yrs (Kinder)",
        "whole": 218760.34,
        "dp15": 32814.05,
        "annualBal": 185946.29,
        "semiBal": 100411.0,
        "qtrBal": 51135.23,
        "moBal": 20825.98,
        "hasMemoryBook": true,
        "hasFarm": false
      },
      {
        "level": "Level 1 (Gr 1-3)",
        "age": "Ages 6 - 8 yrs (Grades 1-3)",
        "whole": 227962.2,
        "dp15": 34194.33,
        "annualBal": 193767.87,
        "semiBal": 104634.65,
        "qtrBal": 53286.16,
        "moBal": 21702.0,
        "hasMemoryBook": false,
        "hasFarm": false
      },
      {
        "level": "Level 2 (Gr 4-5)",
        "age": "Ages 9 - 10 yrs (Grades 4-5)",
        "whole": 233270.7,
        "dp15": 34990.6,
        "annualBal": 198280.09,
        "semiBal": 107071.25,
        "qtrBal": 54527.03,
        "moBal": 22207.37,
        "hasMemoryBook": false,
        "hasFarm": false
      },
      {
        "level": "Level 2 (Gr 6)",
        "age": "Age 11 yrs (Grade 6)",
        "whole": 236455.16,
        "dp15": 35468.27,
        "annualBal": 200986.89,
        "semiBal": 108532.92,
        "qtrBal": 55271.39,
        "moBal": 22510.53,
        "hasMemoryBook": true,
        "hasFarm": false
      }
    ]
  },
  "MLV": {
    "name": "Malaybalay",
    "rates": [
      {
        "level": "Infant Community/ Pre-casa",
        "age": "Toddler (14 mos - 2 yrs)",
        "whole": 123300.47,
        "dp15": 18495.07,
        "annualBal": 104805.4,
        "semiBal": 56594.92,
        "qtrBal": 28821.49,
        "moBal": 11738.2,
        "hasMemoryBook": false,
        "hasFarm": false
      },
      {
        "level": "Casa 1 & 2  (half-day)",
        "age": "Ages 3 - 4 yrs",
        "whole": 125275.85,
        "dp15": 18791.38,
        "annualBal": 106484.47,
        "semiBal": 57501.61,
        "qtrBal": 29283.23,
        "moBal": 11926.26,
        "hasMemoryBook": false,
        "hasFarm": false
      },
      {
        "level": "Casa 3 (whole-day)",
        "age": "Age 5 yrs (Kinder)",
        "whole": 136319.56,
        "dp15": 20447.93,
        "annualBal": 115871.62,
        "semiBal": 62570.68,
        "qtrBal": 31864.7,
        "moBal": 12977.62,
        "hasMemoryBook": true,
        "hasFarm": false
      },
      {
        "level": "Level 1 (Gr 1-3)",
        "age": "Ages 6 - 8 yrs (Grades 1-3)",
        "whole": 136686.12,
        "dp15": 20502.92,
        "annualBal": 116183.2,
        "semiBal": 62738.93,
        "qtrBal": 31950.38,
        "moBal": 13012.52,
        "hasMemoryBook": false,
        "hasFarm": false
      },
      {
        "level": "Level 2 (Gr 4-5)",
        "age": "Ages 9 - 10 yrs (Grades 4-5)",
        "whole": 145469.19,
        "dp15": 21820.38,
        "annualBal": 123648.82,
        "semiBal": 66770.36,
        "qtrBal": 34003.42,
        "moBal": 13848.67,
        "hasMemoryBook": false,
        "hasFarm": false
      },
      {
        "level": "Level 2 (Gr 6)",
        "age": "Age 11 yrs (Grade 6)",
        "whole": 148653.66,
        "dp15": 22298.05,
        "annualBal": 126355.61,
        "semiBal": 68232.03,
        "qtrBal": 34747.79,
        "moBal": 14151.83,
        "hasMemoryBook": true,
        "hasFarm": false
      },
      {
        "level": "Level 3 (Gr 7-9)",
        "age": "Ages 12 - 14 yrs (Grades 7-9)",
        "whole": 150883.46,
        "dp15": 22632.52,
        "annualBal": 128250.94,
        "semiBal": 69255.51,
        "qtrBal": 35269.01,
        "moBal": 14364.11,
        "hasMemoryBook": false,
        "hasFarm": true
      },
      {
        "level": "Level 4 (Gr 10-11)",
        "age": "Ages 15 - 16 yrs (Grades 10-11)",
        "whole": 152392.3,
        "dp15": 22858.84,
        "annualBal": 129533.45,
        "semiBal": 69948.06,
        "qtrBal": 35621.7,
        "moBal": 14507.75,
        "hasMemoryBook": false,
        "hasFarm": true
      }
    ]
  },
  "SRG": {
    "name": "Surigao",
    "rates": [
      {
        "level": "Infant Community/ Pre-casa",
        "age": "Toddler (14 mos - 2 yrs)",
        "whole": 99814.671245148,
        "dp15": 14972.2006867722,
        "annualBal": 84842.4705583758,
        "semiBal": 45814.93410152294,
        "qtrBal": 23331.67940355335,
        "moBal": 9502.35670253809,
        "hasMemoryBook": false,
        "hasFarm": false
      },
      {
        "level": "Casa 1 & 2  (half-day)",
        "age": "Ages 3 - 4 yrs",
        "whole": 101413.78235218117,
        "dp15": 15212.067352827175,
        "annualBal": 86201.714999354,
        "semiBal": 46548.92609965116,
        "qtrBal": 23705.47162482235,
        "moBal": 9654.592079927648,
        "hasMemoryBook": false,
        "hasFarm": false
      },
      {
        "level": "Casa 3 (whole-day)",
        "age": "Age 5 yrs (Kinder)",
        "whole": 110353.93026599652,
        "dp15": 16553.089539899476,
        "annualBal": 93800.84072609704,
        "semiBal": 50652.45399209241,
        "qtrBal": 25795.231199676688,
        "moBal": 10505.69416132287,
        "hasMemoryBook": true,
        "hasFarm": false
      },
      {
        "level": "Level 1 (Gr 1-3)",
        "age": "Ages 6 - 8 yrs (Grades 1-3)",
        "whole": 110650.67077160453,
        "dp15": 16597.60061574068,
        "annualBal": 94053.07015586385,
        "semiBal": 50788.65788416648,
        "qtrBal": 25864.594292862563,
        "moBal": 10533.943857456752,
        "hasMemoryBook": false,
        "hasFarm": false
      },
      {
        "level": "Level 2 (Gr 4-5)",
        "age": "Ages 9 - 10 yrs (Grades 4-5)",
        "whole": 117760.77945119575,
        "dp15": 17664.116917679363,
        "annualBal": 100096.66253351638,
        "semiBal": 54052.19776809885,
        "qtrBal": 27526.58219671701,
        "moBal": 11210.826203753835,
        "hasMemoryBook": false,
        "hasFarm": false
      },
      {
        "level": "Level 2 (Gr 6)",
        "age": "Age 11 yrs (Grade 6)",
        "whole": 120338.67019519574,
        "dp15": 18050.80052927936,
        "annualBal": 102287.86966591637,
        "semiBal": 55235.449619594845,
        "qtrBal": 28129.164158127005,
        "moBal": 11456.241402582635,
        "hasMemoryBook": true,
        "hasFarm": false
      }
    ]
  },
  "ILO": {
    "name": "Iloilo (Sta. Barbara Heights - 20% Pioneer Discount)",
    "rates": [
      {
        "level": "Infant Community/ Pre-casa",
        "age": "Toddler (14 mos - 2 yrs)",
        "whole": 99218.47320000001,
        "dp15": 14882.770980000001,
        "annualBal": 84335.70222,
        "semiBal": 45541.27919880001,
        "qtrBal": 23192.318110500004,
        "moBal": 9445.598648640002,
        "hasMemoryBook": false,
        "hasFarm": false
      },
      {
        "level": "Casa 1 & 2  (half-day)",
        "age": "Ages 3 - 4 yrs",
        "whole": 99218.47320000001,
        "dp15": 14882.770980000001,
        "annualBal": 84335.70222,
        "semiBal": 45541.27919880001,
        "qtrBal": 23192.318110500004,
        "moBal": 9445.598648640002,
        "hasMemoryBook": false,
        "hasFarm": false
      },
      {
        "level": "Casa 3 (whole-day)",
        "age": "Age 5 yrs (Kinder)",
        "whole": 107965.09152,
        "dp15": 16194.763728,
        "annualBal": 91770.327792,
        "semiBal": 49555.97700768,
        "qtrBal": 25236.8401428,
        "moBal": 10278.276712704,
        "hasMemoryBook": true,
        "hasFarm": false
      },
      {
        "level": "Level 1 (Gr 1-3)",
        "age": "Ages 6 - 8 yrs (Grades 1-3)",
        "whole": 108255.40703999999,
        "dp15": 16238.311055999999,
        "annualBal": 92017.09598399999,
        "semiBal": 49689.23183136,
        "qtrBal": 25304.701395599997,
        "moBal": 10305.914750208,
        "hasMemoryBook": false,
        "hasFarm": false
      },
      {
        "level": "Level 2 (Gr 4-5)",
        "age": "Ages 9 - 10 yrs (Grades 4-5)",
        "whole": 115211.59848,
        "dp15": 17281.739772,
        "annualBal": 97929.858708,
        "semiBal": 52882.12370232,
        "qtrBal": 26930.711144700002,
        "moBal": 10968.144175296,
        "hasMemoryBook": false,
        "hasFarm": false
      },
      {
        "level": "Level 2 (Gr 6)",
        "age": "Age 11 yrs (Grade 6)",
        "whole": 117733.69872000001,
        "dp15": 17660.054808,
        "annualBal": 100073.64391200001,
        "semiBal": 54039.76771248001,
        "qtrBal": 27520.252075800006,
        "moBal": 11208.248118144003,
        "hasMemoryBook": true,
        "hasFarm": false
      }
    ]
  }
};

function formatPHP(amount) {
  if (typeof amount !== 'number') amount = parseFloat(amount) || 0;
  return '₱' + amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function resolveCampusCode(text, defaultCode = 'DVO') {
  const lower = (text || '').toLowerCase();
  if (lower.includes('alwana') || lower.includes('cdo') || lower.includes('cagayan') || lower.includes('bukidnon') || lower.includes('granja') || lower.includes('baungon')) {
    return 'LGE/ALW';
  }
  if (lower.includes('davao') || lower.includes('obrero') || lower.includes('mandug')) {
    return 'DVO';
  }
  if (lower.includes('cebu') || lower.includes('magsaysay') || lower.includes('tandang sora')) {
    return 'CBU';
  }
  if (lower.includes('mckinley') || (lower.includes('bgc') && !lower.includes('bayani')) || lower.includes('taguig') || lower.includes('bayani')) {
    return 'MCK / BYN';
  }
  if (lower.includes('alabang') || lower.includes('filinvest') || lower.includes('muntinlupa')) {
    return 'ALB';
  }
  if (lower.includes('antipolo') || lower.includes('taktak')) {
    return 'ANT';
  }
  if (lower.includes('calle industria') || lower.includes('bridgetowne') || lower.includes('quezon city') || lower.includes('qc')) {
    return 'BQC';
  }
  if (lower.includes('greenhills') || lower.includes('mandaluyong')) {
    return 'GRH';
  }
  if (lower.includes('carmelray') || lower.includes('canlubang') || lower.includes('laguna') || lower.includes('sta. rosa') || lower.includes('santa rosa')) {
    return 'STR';
  }
  if (lower.includes('malaybalay')) {
    return 'MLV';
  }
  if (lower.includes('surigao')) {
    return 'SRG';
  }
  if (lower.includes('iloilo') || lower.includes('barbara')) {
    return 'ILO';
  }
  return defaultCode;
}

function matchTuitionRate(rates, text) {
  if (!rates || rates.length === 0) return null;
  const lower = (text || '').toLowerCase();

  // 1. Grade levels first (e.g. Grade 1, Gr 7, Level 2)
  const grMatch = lower.match(/\b(?:grade|gr|level)\s*([1-9]|1[0-2])\b/i);
  if (grMatch) {
    const gr = parseInt(grMatch[1], 10);
    if (gr >= 1 && gr <= 3) return rates.find(r => r.level.includes('Level 1') || r.level.includes('Gr 1-3')) || rates[3];
    if (gr === 4 || gr === 5) return rates.find(r => r.level.includes('Gr 4-5')) || rates[4];
    if (gr === 6) return rates.find(r => r.level.includes('Gr 6')) || rates[5];
    if (gr >= 7 && gr <= 9) return rates.find(r => r.level.includes('Gr 7-9')) || rates[6] || rates[rates.length - 1];
    if (gr === 10 || gr === 11) return rates.find(r => r.level.includes('Gr 10-11')) || rates[7] || rates[rates.length - 1];
    if (gr === 12) return rates.find(r => r.level.includes('Gr 12')) || rates[rates.length - 1];
  }

  // 2. Named plane keywords
  if (lower.includes('kinder') || lower.includes('casa 3') || lower.includes('senior casa')) {
    return rates.find(r => r.level.includes('Casa 3')) || rates[2] || rates[1];
  }
  if (lower.includes('toddler') || lower.includes('infant') || lower.includes('pre-casa') || lower.includes('precasa')) {
    return rates[0];
  }
  if (lower.includes('casa') || lower.includes('preschool') || lower.includes('pre-school')) {
    return rates.find(r => r.level.includes('Casa 1')) || rates[1] || rates[0];
  }
  if (lower.includes('lower elementary') || lower.includes('primary')) {
    return rates.find(r => r.level.includes('Level 1')) || rates[3] || rates[2];
  }
  if (lower.includes('upper elementary')) {
    return rates.find(r => r.level.includes('Level 2')) || rates[4] || rates[3];
  }
  if (lower.includes('junior high') || lower.includes('jhs') || lower.includes('erdkinder')) {
    return rates.find(r => r.level.includes('Gr 7-9')) || rates[6] || rates[rates.length - 1];
  }
  if (lower.includes('senior high') || lower.includes('shs')) {
    return rates.find(r => r.level.includes('Gr 10-11') || r.level.includes('Gr 12')) || rates[rates.length - 1];
  }

  // 3. Child Age Matching
  const ageMatch = lower.match(/\b([1-9]|1[0-8])\s*(?:yo|y\.o\.|years?\s*old|years?|yrs?|yr|anyos|ka tuig|taon)?\b/i);
  if (ageMatch) {
    const age = parseInt(ageMatch[1], 10);
    if (age <= 2) return rates[0];
    if (age === 3 || age === 4) return rates[1] || rates[0];
    if (age === 5) return rates[2] || rates[1];
    if (age >= 6 && age <= 8) return rates[3] || rates[2];
    if (age === 9 || age === 10) return rates[4] || rates[3];
    if (age === 11) return rates[5] || rates[4];
    if (age >= 12 && age <= 14) return rates[6] || rates[rates.length - 1];
    if (age === 15 || age === 16) return rates[7] || rates[rates.length - 1];
    if (age >= 17) return rates[rates.length - 1];
  }

  return null;
}

function getTuitionResponse(fullContext, campusInfo, isBisaya, isTagalog, parentName = 'Prospective Parent') {
  const code = resolveCampusCode(fullContext + ' ' + (campusInfo?.name || ''), 'DVO');
  const campusData = TUITION_SCHEDULE_SY26_27[code] || TUITION_SCHEDULE_SY26_27['DVO'];

  const matchedRate = matchTuitionRate(campusData.rates, fullContext);

  if (matchedRate) {
    const memoryNote = matchedRate.hasMemoryBook ? ' (includes the commemorative Memory Book, ₱3,184.45)' : '';
    const farmNote = matchedRate.hasFarm ? ' (includes farm consumables and laboratory fees)' : '';

    if (isBisaya) {
      return `📋 **Official SY 2026–2027 Tuition Breakdown — ${campusData.name}**\n` +
             `👶 **Developmental Level:** ${matchedRate.level} (${matchedRate.age})\n\n` +
             `• **Whole Year Fee:** **${formatPHP(matchedRate.whole)}**\n` +
             `• **15% Slot Reservation Down Payment:** **${formatPHP(matchedRate.dp15)}** *(mobayad sulod sa 24 Mar hangtod 13 Apr aron ma-reserve ang slot)*\n\n` +
             `💳 **Mga Payment Schedule Options:**\n` +
             `1. 🌟 **Annual Plan (Full Payment):** **${formatPHP(matchedRate.annualBal)}** balance tungod sa or before August 7, 2026 (walay dugang interest/carrying fee).\n` +
             `2. 🗓️ **Semi-Annual Plan (2 Hulog):** **${formatPHP(matchedRate.semiBal)}** kada hulog (due Aug 7 ug Dec 7; 8% carrying fee).\n` +
             `3. 📆 **Quarterly Plan (4 Hulog):** **${formatPHP(matchedRate.qtrBal)}** kada hulog (due Aug 7, Oct 7, Dec 7, ug Mar 7; 10% carrying fee).\n` +
             `4. 📅 **Monthly Plan (10 Hulog):** **${formatPHP(matchedRate.moBal)}** matag ika-7 sa bulan sugod Aug 2026 (12% carrying fee).\n\n` +
             `👨‍👩‍👧‍👦 **Sibling Discount Privileges:** Dunay ~5% discount para sa pamilyang dunay 2 o kapin pa ka anak nga naka-enroll!\n` +
             `✨ **Inclusions:** Apil na ang tanang communal consumables${memoryNote}${farmNote}.\n\n` +
             `Gusto ba ninyo mag-book og observation walkthrough sa ${campusData.name} o makig-istorya sa atong accounting desk (**accounting@theabbasorchard.edu.ph**)?\n` +
             `<!-- DISPATCH: {"campus": "${campusData.name}", "to": "accounting@theabbasorchard.edu.ph", "subject": "Tuition Quote SY 2026-2027 (${matchedRate.level})", "parentName": "${parentName}", "parentContact": "Captured via AI Session", "details": "Parent requested tuition for ${matchedRate.level} (${formatPHP(matchedRate.whole)})."} -->`;
    }

    if (isTagalog) {
      return `📋 **Official SY 2026–2027 Tuition Breakdown — ${campusData.name}**\n` +
             `👶 **Developmental Level:** ${matchedRate.level} (${matchedRate.age})\n\n` +
             `• **Whole Year Fee:** **${formatPHP(matchedRate.whole)}**\n` +
             `• **15% Slot Reservation Down Payment:** **${formatPHP(matchedRate.dp15)}** *(ibabayad sa pagitan ng 24 Mar at 13 Apr para ma-secure ang slot)*\n\n` +
             `💳 **Mga Opsyon sa Pagbabayad:**\n` +
             `1. 🌟 **Annual Plan (Isahang Bayad):** **${formatPHP(matchedRate.annualBal)}** balanse sa o bago mag-August 7, 2026 (walang carrying fee).\n` +
             `2. 🗓️ **Semi-Annual Plan (2 Hulog):** **${formatPHP(matchedRate.semiBal)}** bawat hulog (due Aug 7 at Dec 7; 8% carrying fee).\n` +
             `3. 📆 **Quarterly Plan (4 na Hulog):** **${formatPHP(matchedRate.qtrBal)}** bawat hulog (due Aug 7, Oct 7, Dec 7, at Mar 7; 10% carrying fee).\n` +
             `4. 📅 **Monthly Plan (10 Hulog):** **${formatPHP(matchedRate.moBal)}** buwan-buwan tuwing ika-7 simula Aug 2026 (12% carrying fee).\n\n` +
             `👨‍👩‍👧‍👦 **Sibling Discount:** May ~5% bawas para sa pamilyang may 2 o higit pang anak na naka-enroll!\n` +
             `✨ **Kasama sa Bayarin:** Kasama na ang communal consumables${memoryNote}${farmNote}.\n\n` +
             `Nais po ba ninyong mag-book ng observation walkthrough sa ${campusData.name} o kumonsulta sa accounting desk (**accounting@theabbasorchard.edu.ph**)?\n` +
             `<!-- DISPATCH: {"campus": "${campusData.name}", "to": "accounting@theabbasorchard.edu.ph", "subject": "Tuition Quote SY 2026-2027 (${matchedRate.level})", "parentName": "${parentName}", "parentContact": "Captured via AI Session", "details": "Parent requested tuition for ${matchedRate.level} (${formatPHP(matchedRate.whole)})."} -->`;
    }

    return `📋 **Official SY 2026–2027 Tuition Fee Breakdown — ${campusData.name}**\n` +
           `👶 **Level:** ${matchedRate.level} (${matchedRate.age})\n\n` +
           `• **Whole Year Fee:** **${formatPHP(matchedRate.whole)}**\n` +
           `• **15% Slot Reservation Down Payment:** **${formatPHP(matchedRate.dp15)}** *(reserves a slot; payment window 24 Mar – 13 Apr)*\n\n` +
           `💳 **Payment Schedule Options:**\n` +
           `1. 🌟 **Annual Plan (Full Payment):** **${formatPHP(matchedRate.annualBal)}** remaining balance due on or before August 7, 2026 (Zero carrying fee).\n` +
           `2. 🗓️ **Semi-Annual Plan (2 Installments):** **${formatPHP(matchedRate.semiBal)}** per payment (due Aug 7 and Dec 7; 8% carrying fee).\n` +
           `3. 📆 **Quarterly Plan (4 Installments):** **${formatPHP(matchedRate.qtrBal)}** per payment (due Aug 7, Oct 7, Dec 7, and Mar 7; 10% carrying fee).\n` +
           `4. 📅 **Monthly Plan (10 Installments):** **${formatPHP(matchedRate.moBal)}** monthly every 7th of the month starting Aug 2026 (12% carrying fee).\n\n` +
           `👨‍👩‍👧‍👦 **Sibling Discount Privileges:** Enrolling 2 or more children? Receive a ~5% discount across all whole-year fees and installment modes!\n` +
           `✨ **Inclusions:** Includes all communal consumables${memoryNote}${farmNote}.\n\n` +
           `Would you like to schedule an Observation Walkthrough at ${campusData.name} or speak directly with Central Accounting (**accounting@theabbasorchard.edu.ph**)?\n` +
           `<!-- DISPATCH: {"campus": "${campusData.name}", "to": "accounting@theabbasorchard.edu.ph", "subject": "Tuition Quote SY 2026-2027 (${matchedRate.level})", "parentName": "${parentName}", "parentContact": "Captured via AI Session", "details": "Parent requested tuition for ${matchedRate.level} (${formatPHP(matchedRate.whole)})."} -->`;
  }

  // Overview Table when specific level is not yet indicated
  let summaryTable = `📋 **Official SY 2026–2027 Annual Tuition Summary — ${campusData.name}**\n\n` +
                     `| Level | Developmental Plane | Whole Year Fee | 15% Down Payment |\n` +
                     `|---|---|---|---|\n`;
  campusData.rates.forEach(r => {
    summaryTable += `| ${r.level} | ${r.age} | **${formatPHP(r.whole)}** | ${formatPHP(r.dp15)} |\n`;
  });

  summaryTable += `\n💳 **Flexible Payment Schedules:**\n` +
                  `• **Annual Plan:** 15% DP + remaining 85% balance due August 7, 2026 (Full payment privilege)\n` +
                  `• **Semi-Annual Plan:** 15% DP + 2 installments due Aug 7 & Dec 7 (8% carrying fee)\n` +
                  `• **Quarterly Plan:** 15% DP + 4 installments due Aug 7, Oct 7, Dec 7 & Mar 7 (10% carrying fee)\n` +
                  `• **Monthly Plan:** 15% DP + 10 monthly payments every 7th starting Aug 2026 (12% carrying fee)\n\n` +
                  `👨‍👩‍👧‍👦 **Sibling Discount:** ~5% savings for families enrolling 2 or more children.\n` +
                  `✨ **Inclusions:** All communal consumables included (Memory Book included for Casa 3, Gr 6, Gr 12).\n\n` +
                  `What is your **child's age or grade level** so I can calculate the exact installment schedule for your family?\n` +
                  `<!-- DISPATCH: {"campus": "${campusData.name}", "to": "accounting@theabbasorchard.edu.ph", "subject": "Tuition Summary Table Request SY 2026-2027", "parentName": "${parentName}", "parentContact": "Captured via AI Session", "details": "Parent requested full tuition fee schedule for ${campusData.name}."} -->`;

  return summaryTable;
}

module.exports = {
  TUITION_SCHEDULE_SY26_27,
  formatPHP,
  resolveCampusCode,
  matchTuitionRate,
  getTuitionResponse
};
