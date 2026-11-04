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
  if (!text) return defaultCode;
  const lower = String(text).toLowerCase();
  const patterns = [
    { code: 'LGE/ALW', keys: ['alwana', 'cdo', 'cagayan', 'bukidnon', 'granja', 'baungon'] },
    { code: 'DVO', keys: ['davao', 'obrero', 'mandug'] },
    { code: 'CBU', keys: ['cebu', 'magsaysay', 'tandang sora'] },
    { code: 'MCK / BYN', keys: ['mckinley', 'bgc', 'taguig', 'bayani'] },
    { code: 'ALB', keys: ['alabang', 'filinvest', 'muntinlupa'] },
    { code: 'ANT', keys: ['antipolo', 'taktak'] },
    { code: 'BQC', keys: ['calle industria', 'bridgetowne', 'quezon city', 'qc'] },
    { code: 'GRH', keys: ['greenhills', 'mandaluyong', 'wack-wack', 'wack wack'] },
    { code: 'STR', keys: ['carmelray', 'canlubang', 'laguna', 'sta. rosa', 'santa rosa'] },
    { code: 'MLV', keys: ['malaybalay'] },
    { code: 'SRG', keys: ['surigao'] },
    { code: 'ILO', keys: ['iloilo', 'barbara'] }
  ];

  let latestIdx = -1;
  let latestCode = null;

  for (const p of patterns) {
    for (const k of p.keys) {
      const idx = lower.lastIndexOf(k);
      if (idx > latestIdx) {
        latestIdx = idx;
        latestCode = p.code;
      }
    }
  }

  return latestCode || defaultCode;
}

function matchTuitionRate(rates, text) {
  if (!rates || rates.length === 0) return null;
  const lower = (text || '')
    .toLowerCase()
    .replace(/\b(?:jan(?:uary)?|feb(?:ruary)?|mar(?:ch)?|apr(?:il)?|may|jun(?:e)?|jul(?:y)?|aug(?:ust)?|sep(?:t(?:ember)?)?|oct(?:ober)?|nov(?:ember)?|dec(?:ember)?)\s+\d{1,2}(?:st|nd|rd|th)?\b/gi, ' ')
    .replace(/\b\d{1,2}(?:st|nd|rd|th)?\s+(?:of\s+)?(?:jan(?:uary)?|feb(?:ruary)?|mar(?:ch)?|apr(?:il)?|may|jun(?:e)?|jul(?:y)?|aug(?:ust)?|sep(?:t(?:ember)?)?|oct(?:ober)?|nov(?:ember)?|dec(?:ember)?)\b/gi, ' ');

  // Find the MOST RECENT level/age mentioned in the text
  const levelCandidates = [];

  // 1. Grade levels (e.g. Grade 1, Gr 7, Level 2)
  const grRegex = /\b(?:grade|gr|level)\s*([1-9]|1[0-2])\b/gi;
  let m;
  while ((m = grRegex.exec(lower)) !== null) {
    const gr = parseInt(m[1], 10);
    let rate = null;
    if (gr >= 1 && gr <= 3) rate = rates.find(r => r.level.includes('Level 1') || r.level.includes('Gr 1-3')) || rates[3];
    else if (gr === 4 || gr === 5) rate = rates.find(r => r.level.includes('Gr 4-5')) || rates[4];
    else if (gr === 6) rate = rates.find(r => r.level.includes('Gr 6')) || rates[5];
    else if (gr >= 7 && gr <= 9) rate = rates.find(r => r.level.includes('Gr 7-9')) || rates[6] || rates[rates.length - 1];
    else if (gr === 10 || gr === 11) rate = rates.find(r => r.level.includes('Gr 10-11')) || rates[7] || rates[rates.length - 1];
    else if (gr === 12) rate = rates.find(r => r.level.includes('Gr 12')) || rates[rates.length - 1];
    if (rate) levelCandidates.push({ index: m.index, rate });
  }

  // 2. Named plane keywords
  const keywordPlanes = [
    { keys: ['kinder', 'casa 3', 'senior casa'], find: () => rates.find(r => r.level.includes('Casa 3')) || rates[2] || rates[1] },
    { keys: ['toddler', 'infant', 'pre-casa', 'precasa'], find: () => rates[0] },
    { keys: ['casa 1', 'casa 2', 'preschool', 'pre-school'], find: () => rates.find(r => r.level.includes('Casa 1')) || rates[1] || rates[0] },
    { keys: ['lower elementary', 'primary'], find: () => rates.find(r => r.level.includes('Level 1')) || rates[3] || rates[2] },
    { keys: ['upper elementary'], find: () => rates.find(r => r.level.includes('Level 2')) || rates[4] || rates[3] },
    { keys: ['junior high', 'jhs', 'erdkinder'], find: () => rates.find(r => r.level.includes('Gr 7-9')) || rates[6] || rates[rates.length - 1] },
    { keys: ['senior high', 'shs'], find: () => rates.find(r => r.level.includes('Gr 10-11') || r.level.includes('Gr 12')) || rates[rates.length - 1] }
  ];
  for (const kp of keywordPlanes) {
    for (const k of kp.keys) {
      const idx = lower.lastIndexOf(k);
      if (idx !== -1) {
        levelCandidates.push({ index: idx, rate: kp.find() });
      }
    }
  }

  // 3. Explicit child age matching (e.g. "5 yo", "8 years old", "age 4")
  const ageRegex = /\b(?:age\s*)?([1-9]|1[0-8])\s*(?:yo|y\.o\.|years?\s*old|years?|yrs?|yr|anyos|ka tuig|taon)\b/gi;
  while ((m = ageRegex.exec(lower)) !== null) {
    const age = parseInt(m[1], 10);
    let rate = null;
    if (age <= 2) rate = rates[0];
    else if (age === 3 || age === 4) rate = rates[1] || rates[0];
    else if (age === 5) rate = rates[2] || rates[1];
    else if (age >= 6 && age <= 8) rate = rates[3] || rates[2];
    else if (age === 9 || age === 10) rate = rates[4] || rates[3];
    else if (age === 11) rate = rates[5] || rates[4];
    else if (age >= 12 && age <= 14) rate = rates[6] || rates[rates.length - 1];
    else if (age === 15 || age === 16) rate = rates[7] || rates[rates.length - 1];
    else if (age >= 17) rate = rates[rates.length - 1];
    if (rate) levelCandidates.push({ index: m.index, rate });
  }

  if (levelCandidates.length > 0) {
    levelCandidates.sort((a, b) => b.index - a.index);
    return levelCandidates[0].rate;
  }

  return null;
}

function getTuitionResponse(fullContext, campusInfo, isBisaya, isTagalog, parentName = 'Prospective Parent', currentText = '') {
  // Prioritize campus mentioned in currentText, then campusInfo, then fullContext
  let code = resolveCampusCode(currentText, null);
  if (!code && campusInfo && campusInfo.name && !campusInfo.name.includes('Central Admissions')) {
    code = resolveCampusCode(campusInfo.name, null);
  }
  if (!code) {
    code = resolveCampusCode(fullContext, 'DVO');
  }
  const campusData = TUITION_SCHEDULE_SY26_27[code] || TUITION_SCHEDULE_SY26_27['DVO'];

  // Only match a specific single level if the user explicitly asked for a level/age in their current message;
  // otherwise show the complete visual Campus Tuition Chart with the matched level highlighted if any!
  const matchedRate = matchTuitionRate(campusData.rates, currentText || fullContext);
  const askedSpecificInCurrent = Boolean(matchTuitionRate(campusData.rates, currentText));

  if (matchedRate && askedSpecificInCurrent) {
    const memoryNote = matchedRate.hasMemoryBook ? ' (includes Memory Book ₱3,184.45)' : '';
    const farmNote = matchedRate.hasFarm ? ' (includes Farm & Lab consumables)' : '';

    const singleChart =
      `📊 **Official SY 2026–2027 Tuition Fee Chart — ${campusData.name}**\n` +
      `👶 **Selected Level:** **${matchedRate.level}** *(${matchedRate.age})*\n\n` +
      `| Payment Plan | Schedule & Terms | Amount |\n` +
      `|---|---|---|\n` +
      `| **Whole Year Tuition** | Full Academic Year${memoryNote}${farmNote} | **${formatPHP(matchedRate.whole)}** |\n` +
      `| **15% Slot Reservation (DP)** | Locks slot (Mar 24 – Apr 13) | **${formatPHP(matchedRate.dp15)}** |\n` +
      `| **1. Annual Plan** | Remaining 85% due Aug 7 (0% interest) | **${formatPHP(matchedRate.annualBal)}** |\n` +
      `| **2. Semi-Annual Plan** | 2 payments: Aug 7 & Dec 7 | **${formatPHP(matchedRate.semiBal)} / sem** |\n` +
      `| **3. Quarterly Plan** | 4 payments: Aug, Oct, Dec, Mar | **${formatPHP(matchedRate.qtrBal)} / qtr** |\n` +
      `| **4. Monthly Plan** | 10 payments: every 7th (Aug–May) | **${formatPHP(matchedRate.moBal)} / mo** |\n\n` +
      `👨‍👩‍👧‍👦 *Sibling Discount: ~5% off for 2+ enrolled children. All communal consumables included.*\n\n` +
      `Would you like to book a morning **Observation Walkthrough** at **${campusData.name}** (reply with your preferred weekday & mobile number), or see the **full chart for all grade levels**?\n` +
      `<!-- DISPATCH: {"campus": "${campusData.name}", "to": "accounting@theabbasorchard.edu.ph", "subject": "Tuition Chart Quote SY 2026-2027 (${matchedRate.level})", "parentName": "${parentName}", "parentContact": "Captured via AI Session", "details": "Parent requested tuition chart for ${matchedRate.level} at ${campusData.name} (${formatPHP(matchedRate.whole)})."} -->`;

    return singleChart;
  }

  // Complete Visual Tuition Fee Chart across all levels for the campus
  let summaryTable = `📊 **Official SY 2026–2027 Tuition Fee Chart — ${campusData.name}**\n\n` +
                     `| Level / Program | Age Group | Whole Year | 15% Reservation DP | Annual Bal (Aug 7) | Semi-Annual (2x) | Quarterly (4x) | Monthly (10x) |\n` +
                     `|---|---|---|---|---|---|---|---|\n`;
  campusData.rates.forEach(r => {
    const isHighlighted = matchedRate && matchedRate.level === r.level;
    const lvlLabel = isHighlighted ? `👉 **${r.level}**` : `**${r.level}**`;
    summaryTable += `| ${lvlLabel} | ${r.age} | **${formatPHP(r.whole)}** | ${formatPHP(r.dp15)} | ${formatPHP(r.annualBal)} | ${formatPHP(r.semiBal)} | ${formatPHP(r.qtrBal)} | **${formatPHP(r.moBal)}/mo** |\n`;
  });

  summaryTable += `\n📌 **Key Notes:**\n` +
                  `• **15% Down Payment:** Locks your child's slot (payable Mar 24 – Apr 13); deducted from Whole Year Fee.\n` +
                  `• **Inclusions:** All communal consumables included (plus Memory Book for Casa 3, Gr 6 & Gr 12).\n` +
                  `• **Sibling Privilege:** ~5% discount for families enrolling 2 or more children.\n\n` +
                  `Would you like to schedule a morning **Observation Walkthrough** at **${campusData.name}**, or connect with Central Accounting (**accounting@theabbasorchard.edu.ph**)?\n` +
                  `<!-- DISPATCH: {"campus": "${campusData.name}", "to": "accounting@theabbasorchard.edu.ph", "subject": "Tuition Summary Chart Request SY 2026-2027", "parentName": "${parentName}", "parentContact": "Captured via AI Session", "details": "Parent requested tuition fee chart for ${campusData.name}."} -->`;

  return summaryTable;
}

module.exports = {
  TUITION_SCHEDULE_SY26_27,
  formatPHP,
  resolveCampusCode,
  matchTuitionRate,
  getTuitionResponse
};
