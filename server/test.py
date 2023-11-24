import server_functions
def get_username_by_card_id(card_id):
    data = database.get_user_by_card_id(card_id)
    return data[0][1]
def process_desks():
    desks=database.get_desks()
    # desks data: [[4, "Desk 1", 0, null], [5, "Desk 2", 1, "ffc243d4adda2885bb05d603e8d120b2"], [6, "Desk 3", 0, null]]
    new_desks = []
    for desk in desks:
        new_desk = {}
        new_desk["id"] = desk[0]
        new_desk["name"] = desk[1]
        new_desk["status"] = desk[2]
        new_desk["card_id"] = desk[3]
        if new_desk["card_id"]:
            new_desk["user"] = get_username_by_card_id(new_desk["card_id"])
        else:
            new_desk["user"] = None
        new_desks.append(new_desk)
        
    return new_desks

if __name__ == '__main__':
    database = server_functions.Database()
    print(process_desks())
    # print(database.get_user_by_card_id("ffc243d4adda2885bb05d603e8d120b2"))