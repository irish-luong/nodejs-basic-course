app: v1.booking    URL_BASE: https://linear-time-238106.appspot.com/users




/* API create new order 
Order information:
A. Require parameters:

1. Primary information:
    1.1 name - text - require
    1.2 description - require
    1.3 branch - text - default No name

2. Sale information: 
    2.1 Price - float - require - >= 0
    2.2 Amount - int - require

3. Marketing:
    3.1 Image 1
    3.2 Image 2

4. Transportation:
    4.1 weight - float (dv: gr)
    4.2 Dimension - object 
        4.2.1 Height
        4.2.2 Width
        4.2.3 Length
    4.3 Shipping fee

5. Others:
    5.1 good status
6. Log:
    6.1 create_time - unix_time base local time
    6.2 last_update - unix_time base local time

B. Flow:
1. Check enough key parameters.
2. Check data type is object
3. Set params to keys for insert
4. Set create time