#include <eosiolib/eosio.hpp>
using namespace eosio;

class eosnationtps : public eosio::contract {
  public:
      using contract::contract;
      void action(std::string msg) {}
};

EOSIO_ABI( eosnationtps, (action) )