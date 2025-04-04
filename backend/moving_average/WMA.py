import keyboard
import sys
from prettytable import PrettyTable
import matplotlib.pyplot as plt
from colorama import Fore
import time


class WeightedMovingAverage:

    # CONSTRUCTOR
    def __init__(self, data_points, weighted_period, *weights):
        self.__data_points = data_points
        self.__weighted_period = weighted_period
        self.__weights = sorted(weights)

    # GETTER
    @property
    def data_points(self):
        return self.__data_points

    @property
    def weighted_period(self):
        return self.__weighted_period

    @property
    def weights(self):
        return self.__weights

    # SETTER
    @data_points.setter
    def data_points(self, data_points):
        self.__data_points = data_points

    @weighted_period.setter
    def weighted_period(self, weighted_period):
        self.__weighted_period = weighted_period

    @weights.setter
    def weights(self, weights):
        self.__weights = weights



    def __extract_value(self):
        extrd_data = []

        # EXTRACTING THE VALUES IN THE DICTIONARY
        for key, value in self.data_points.items():
            extrd_data.append(value)

        return extrd_data

    def __calculate_wma(self, extrd_data):
        wma = []

        sum_weight = 0
        for i in self.weights:
            sum_weight += i

        for i in range(len(extrd_data) - (self.weighted_period-1)):  # 0 --> length of data points

            count = 0  # for the count of weights
            sum = 0  # for the sum of wma

            for a in range(i, i + self.weighted_period):  # 0 --> (value of i + period)
                dpxaw = extrd_data[a] * self.weights[count]  # dpxaw = data point * assigned weight |

                sum += dpxaw
                count += 1  # incrementing the value of count to move the next index or second highest weight

            if sum_weight != 1:
                sum = sum / sum_weight

            wma.append(sum)

        forecast_value = wma.pop(-1)

        return wma, forecast_value

    def __forecast_error(self, wma, extrd_data):
        forecast_error = []

        for i in range(len(wma)):
            dp = extrd_data[i+self.weighted_period]
            forecast_error.append(wma[i]-dp)

        return forecast_error

    def __absolute_error(self, forecast_error):
        absolute_error = []
        sum_mad = 0

        # GETTING THE ABSOLUTE VALUE OF EACH FORECAST ERROR
        for i in forecast_error:
            absolute_error.append(abs(i))

            # >>GETTING THE MEAN ABSOLUTE DEVIATION
        for i in absolute_error:
            sum_mad += i

        mean_absolute_deviation = sum_mad / (len(self.data_points) - self.weighted_period)

        return absolute_error, mean_absolute_deviation

    def __squared_error(self, absolute_error):

        squared_error = []
        sum_mse = 0

        # GETTING THE SQUARED ERROR OF EACH ABSOLUTE ERROR
        for i in absolute_error:
            squared_error.append(pow(i, 2))

            # >> GETTING THE MEAN SQUARED ERROR
        for i in squared_error:
            sum_mse += i
        mean_squared_error = sum_mse / (len(self.data_points) - self.weighted_period)

        return squared_error, mean_squared_error

    def __percentage_error(self, absolute_error, extrd_data):
        percentage_error = []
        sum_mape = 0
        # GETTING THE PERCENTAGE ERROR
        for i in range(len(absolute_error)):
            percentage_error.append((absolute_error[i] / extrd_data[i + self.weighted_period]) * 100)

            # >> GETTING THE MEAN ABSOLUTE PERCENTAGE ERROR
        for i in percentage_error:
            sum_mape += i

        mean_absolute_percentage_error = sum_mape / len(percentage_error)

        return percentage_error, mean_absolute_percentage_error

    def __display_table_plot_graph(self, extrd_data, wma, forecast_error, absolute_error, squared_error, percentage_error, forecasted_val, mad, mse, mape):

        # PRINTING ALL THE DATA WITHIN A TABLE
        wholedata = PrettyTable(["Time Period", "Data", "{}WMA".format(self.weighted_period), "Error", "|Error|", "Error²", "%Error"])

        i = 0
        for key, value in self.data_points.items():

            if i < self.weighted_period:
                wholedata.add_row([key, value, "", "", "", "", ""])
                i+= 1

            elif i >= self.weighted_period:
                wholedata.add_row([key, value,
                                   round(wma[i - self.weighted_period], 2),
                                   round(forecast_error[i - self.weighted_period], 2),
                                   round(absolute_error[i - self.weighted_period], 2),
                                   round(squared_error[i - self.weighted_period], 2),
                                   round(percentage_error[i - self.weighted_period], 2)])
                i+=1

            elif i > len(self.data_points):
                break
            else:
                i += 1

        M = Fore.MAGENTA
        C = Fore.CYAN
        LR = Fore.LIGHTRED_EX
        LG = Fore.LIGHTGREEN_EX
        rst = Fore.RESET


        wholedata.add_row(["", "", M+str(forecasted_val)+rst, "", "", "", ""])
        wholedata.add_row(["", "", "", "", C+str(round(mad, 2))+rst, LR+str(round(mse, 2))+rst,
                           LG+str(round(mape, 2))+rst])
        wholedata.add_row(["", "", "", "", C+"MAD"+rst, LR+"MSE"+rst, LG+"MAPE"+rst])

        print(wholedata)

        # GRAPH REPRESENTATION------------------------------------------------------------------------------------------

        time_period = []
        for key, value in self.data_points.items():
            time_period.append(key)

        # plt.plot(time_period, extrd_data, label="Actual Data")
        # plt.plot(time_period[self.weighted_period:], wma, label="Weighted Moving Average")
        # plt.legend()
        # plt.xlabel("Time Period")
        # plt.ylabel("Data")
        # plt.title("{} Weighted Moving Average".format(self.weighted_period))
        # plt.show()

        return


    def weighted_moving_averages(self):

        self.__verify_number_of_weights_and_weighted_period()
        self.__verify_sum_of_weights()

        print("Weights: ", self.weights)

        extrd_data = self.__extract_value()
        wma, forecasted_val = self.__calculate_wma(extrd_data)
        forecast_error = self.__forecast_error(wma, extrd_data)
        absolute_error, mad = self.__absolute_error(forecast_error)
        squared_error, mse = self.__squared_error(absolute_error)
        percentage_error, mape = self.__percentage_error(absolute_error, extrd_data)

        self.__display_table_plot_graph(extrd_data, wma, forecast_error, absolute_error,
                                        squared_error, percentage_error, forecasted_val, mad, mse, mape)

        return forecasted_val, mad, mse, mape

    def __verify_sum_of_weights(self):

        sum_weight = 0
        for i in self.weights:
            sum_weight += i


        if sum_weight != 1:
            answer = input(f"Warning: The sum of weights provided [{Fore.RED}{sum_weight}{Fore.RESET}], "
                           f"which does not equal to 1 or 100%."
                  f"\nThis may lead to inaccurate calculations for the weighted moving average.\n"
                  f"Please ensure that the weights add up to 1 or 100% to maintain the validity of the computation.\n\n"
                  f"Do you still want to proceed with the computation?(Yes/No): ").lower()

            if answer == "yes":
                print("\nContinuing with the computation", end="")
                for i in range(3):
                    print(".", end="")
                    time.sleep(1)
                print()
                return
            elif answer == "no":
                print("Computation Aborted.")
                sys.exit()
            else:
                ans = ""
                while ans.lower() not in ["yes", "no"]:
                    ans = input("Invalid input. Please enter either 'Yes' or 'No': ").lower()

                if ans == "yes":
                    print("\nContinuing with the computation", end="")
                    for i in range(3):
                        print(".", end="")
                        time.sleep(1)
                    print()
                    return
                elif ans == "no":
                    print("Computation Aborted.")
                    sys.exit()


        else:
            return


    def __verify_number_of_weights_and_weighted_period(self):

        answer = ""

        if self.weighted_period != len(self.weights):
            print("Warning: The specified weighted period does not match the number of weights provided.\n"
                  "You have entered [{}] weights, but the period expects [{}] weights.\n"
                  "Please ensure that the number of weights corresponds to the specified period\n"
                  "for accurate weighted moving average calculations.".format(len(self.weights), self.weighted_period))


            print("\nPress any key to exit..")
            keyboard.read_event(suppress=True)
            sys.exit()
        else:
            return
