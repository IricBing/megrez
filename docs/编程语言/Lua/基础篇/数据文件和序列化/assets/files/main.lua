local count = 0
function Entry () count = count + 1 end
dofile("data.lua")
print("number of entries: " .. count)

--> number of entries: 2